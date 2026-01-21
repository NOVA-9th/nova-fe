"use client"

import TextInput from "@/shared/ui/input/text_input/TextInput"
import { useState } from "react"
import { ListFilter, Search } from "lucide-react"
import { Button } from "@/shared/ui/action/button/Button"
import { IconBtn } from "@/shared/ui/action/icon_button/IconBtn"
import { TextBtn } from "@/shared/ui/action/text_button/TextBtn"
import SectionHeader from "@/shared/ui/content/SectionHeader/SectionHeader"
import { SelectionChipBtn } from "@/shared/ui/action/selection_chip/SelectionChipBtn"


export const KeywordCard = () => {

    const [value, setValue] = useState('')

    const onChange = (value: string) => {
        setValue(value)
    }

    return (
        <div className="flex flex-col w-full h-full justify-start items-center p-5 gap-5 bg-white">
            <div className="flex w-full justify-between items-center gap-3">
                <TextInput
                    size="lg"
                    variant="surface"
                    data={false}
                    value={value}
                    placeholder="제목 혹은 키워드로 검색하기"
                    onChange={onChange}
                    icon={Search}
                    className="flex-1"
                />
                <TextBtn
                    onClick={() => {}}
                    size="lg"
                    label="필터 초기화"
                    leftIcon={<ListFilter />}
                    style="surface"
                    className="flex justify-center items-center px-padding-bold py-padding-regular rounded-md bg-surface"
                >
                </TextBtn>
            </div>
            <div className="flex w-full h-full items-center gap-8">
                <div className="flex flex-col w-full h-full justify-start items-start gap-4">
                    <SectionHeader text="글 정렬" />
                    <div className="flex gap-2">
                        <SelectionChipBtn
                            size="md"
                            style="surface"
                            selected={true}
                            label="최신순"
                            onClick={() => {}}
                        />
                        <SelectionChipBtn
                            size="md"
                            style="surface"
                            selected={false}
                            label="최신순"
                            onClick={() => {}}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full h-full justify-start items-start gap-4">
                    <SectionHeader text="글 유형" />
                </div>

            </div>
        </div>
    )
}