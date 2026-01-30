'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SIDE_ITEMS } from '@/widgets/layouts/sidebar/data/SideItems';

export const FloatingBar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className='md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-32px)]'
      aria-label='Floating navigation'
    >
      <div className='flex items-center justify-between gap-1.5 rounded-static-pill border border-outline bg-base p-1.5 shadow-lg'>
        {SIDE_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex-1 flex items-center justify-center gap-1.5 rounded-static-pill px-3.5 py-3',
                isActive(item.href) && 'bg-peak',
              )}
            >
              <span
                className={clsx(
                  'flex items-center gap-1.5 whitespace-nowrap',
                  active ? 'typo-callout-key text-white' : 'typo-callout-base text-optional',
                )}
              >
                <Icon size={14} />
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
