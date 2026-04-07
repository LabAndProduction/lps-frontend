"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";
import classNames from "classnames";
import { useText } from "@/context/text.context";
import { IProductTabsProps } from "@/types/props/pages.types";

export default function ProductTabs({ product, attributes }: IProductTabsProps) {
    const { text } = useText();
    const tabs = [
        { id: 0, title: text("О товаре") },
        { id: 1, title: text("Характеристики") },
    ];
    return (
        <div className="custom-block-with-padding pb-9">
            <TabGroup className="flex flex-col gap-6 w-full">
                <TabList className={"flex sm:gap-x-6 gap-x-4 gap-y-2 flex-wrap"}>
                    {tabs.map((tab) => (
                        <Tab key={tab.id} as={Fragment}>
                            {({ selected }) => (
                                <button
                                    type="button"
                                    className={classNames(
                                        "font-medium text-lg hover:text-main py-[0.375rem] outline-none ring-none overflow-hidden relative after:absolute after:bottom-0 after:left-0 after:transition-300 after:block after:h-[0.125rem] after:w-full after:bg-main after:-translate-x-[101%]",
                                        selected && "text-main after:!translate-x-0",
                                    )}>
                                    {tab.title}
                                </button>
                            )}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div
                            className="text-block"
                            dangerouslySetInnerHTML={{
                                __html: product.data.body,
                            }}></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="flex flex-col gap-2">
                            {/* max-w-[540px] */}
                            {attributes.data.map((attribute) => {
                                return (
                                    <div key={attribute.id} className="flex items-end">
                                        <h4 className="w-max leading-130 text-sm">{attribute.name}</h4>
                                        <div className="border-b border-dotted grow border-placeholder min-w-[1.25rem]"></div>
                                        <p className="leading-120 text-sm text-end">
                                            {attribute.attribute_values.map((attr) => attr.name).join(", ")}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        {/* </div> */}
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
}
