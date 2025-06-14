import Image from "next/image";
import { Drawer } from "antd";
import { ArrowLeft, ArrowRight } from "iconsax-react";

import { SkipModel } from "@/lib/types";

interface Props {
    selected?: SkipModel | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const BottomDrawer = ({ 
    selected,
    isOpen,
    onClose,
    onConfirm
}: Props) => {
    return (
        <Drawer
            placement="bottom"
            closable={false}
            height={150}
            open={isOpen}
            onClose={onClose}>
            <div className="flex justify-center">
                <div className="w-full flex items-center px-4 sm:px-0 sm:w-5/6 lg:w-2/3">
                    <div className="hidden sm:block flex-1">
                        <Image alt="skip preview" className="h-28 rounded-lg" src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${selected?.size}-yarder-skip.jpg`} />
                    </div>
                    <div className="flex-4 px-4">
                        <p className="text-center">Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.</p>
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                            <div className="flex items-center mb-4 sm:mb-0 w-full sm:w-auto justify-between sm:justify-normal">
                                <p className="text-md font-bold mr-2">{selected?.size} Yard Skip</p>
                                <p className="text-2xl text-blue-700 font-bold mr-2">£{selected?.price_before_vat}</p>
                                <p className="text-md font-bold">{selected?.hire_period_days} Day Hire</p>
                            </div>
                            <div className="flex w-full sm:w-auto justify-between sm:justify-normal">
                                <button onClick={onClose} className="bg-none text-blue-700 cursor-pointer text-base font-semibold items-center flex rounded-xl px-4 py-2">
                                    <ArrowLeft className="mr-2" color='#1447e6' size={18} /> Back
                                </button>
                                <button onClick={onConfirm} className="ml-2 bg-blue-700 text-white cursor-pointer text-base font-semibold items-center flex rounded-xl px-4 py-2">
                                    Continue <ArrowRight className="ml-2" color='white' size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default BottomDrawer;