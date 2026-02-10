'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { showToast } from '@/shared/utils/toast';
import type { CardNews } from '@/features/feed/types/api';
import { useSavedArticles } from './useSavedArticles';

const SAVED_ARTICLES_EXPORT_ROOT_ID = 'saved-articles-export-root';

const getTimestamp = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${yyyy}${mm}${dd}-${hh}${min}`;
};

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

const toExportData = (articles: CardNews[]) =>
  articles.map((article) => ({
    id: article.id,
    title: article.title,
    cardType: article.cardType,
    siteName: article.siteName,
    author: article.author,
    publishedAt: article.publishedAt,
    summary: article.summary,
    evidence: article.evidence,
    originalUrl: article.originalUrl,
    keywords: article.keywords,
  }));

export const useSavedExport = () => {
  const { sortedArticles, isLoading } = useSavedArticles();
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const hasExportableArticles = sortedArticles.length > 0;

  const exportSavedAsJson = async () => {
    if (isLoading || !hasExportableArticles) {
      showToast.error('내보낼 저장 아티클이 없습니다.');
      return false;
    }

    try {
      const exportData = {
        exportedAt: new Date().toISOString(),
        count: sortedArticles.length,
        articles: toExportData(sortedArticles),
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json;charset=utf-8',
      });
      downloadBlob(blob, `saved-articles-${getTimestamp()}.json`);
      showToast.success('JSON 다운로드가 시작되었습니다.');
      return true;
    } catch (error) {
      console.error('JSON export failed:', error);
      showToast.error('JSON 다운로드에 실패했습니다.');
      return false;
    }
  };

  const exportSavedAsPdf = async () => {
    if (isExportingPdf) return false;

    if (isLoading || !hasExportableArticles) {
      showToast.error('내보낼 저장 아티클이 없습니다.');
      return false;
    }

    if (typeof window === 'undefined') {
      showToast.error('PDF 내보내기를 실행할 수 없습니다.');
      return false;
    }

    const target = document.getElementById(SAVED_ARTICLES_EXPORT_ROOT_ID);
    if (!target) {
      showToast.error('내보낼 저장 아티클 영역을 찾을 수 없습니다.');
      return false;
    }

    try {
      setIsExportingPdf(true);

      const canvas = await html2canvas(target, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      pdf.save(`saved-articles-${getTimestamp()}.pdf`);
      showToast.success('PDF 다운로드가 시작되었습니다.');
      return true;
    } catch (error) {
      console.error('PDF export failed:', error);
      showToast.error('PDF 다운로드에 실패했습니다.');
      return false;
    } finally {
      setIsExportingPdf(false);
    }
  };

  return {
    exportSavedAsJson,
    exportSavedAsPdf,
    isExportingPdf,
  };
};

