import { message, Tooltip } from "antd";
import { ArrowRight, Warning2 } from "iconsax-react";

import { SkipModel } from "@/lib/types"

interface Props {
    skip: SkipModel,
    selected: boolean,
    onClick: (skip: SkipModel) => void,
}

const SkipCard = ({ skip, selected, onClick }: Props) => {
    const [messageApi, contextHolder] = message.useMessage();

    const isDisabled = !skip.allowed_on_road && !skip.allows_heavy_waste;
    const showWarnings = !skip.allowed_on_road || !skip.allows_heavy_waste;

    const select = () => {
        if (isDisabled) {
            messageApi.open({
                type: 'error',
                content: 'This skip is not suitable for heavy waste and is also not allowed on road.',
                duration: 2,
            });
        } else {
            onClick(skip);
        }
    }
    return (
        // <div onClick={select} className="cursor-pointer">
        //     <div
        //         style={{ backgroundImage: `url(https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg)` }}
        //         className={`border-${selected ? '4' : '2'} border-${selected ? 'blue-700' : 'gray-700'} hover:border-blue-600 relative w-full h-96 shadow-md bg-cover bg-center rounded-lg mb-4`}>
        //         {/* <div className="w-full rounded-lg h-full bg-black opacity-40" /> */}
        //         <div className="w-full rounded-lg h-full bg-black transition opacity-30" />
        //         <div className="absolute top-0 p-6 w-full h-full flex items-end">
        //             <button className={`bg-${selected ? 'black' : 'blue-700'} text-white justify-center flex items-center font-medium rounded-lg px-4 py-2 w-full cursor-pointer` }>
        //                 {selected ? (
        //                     <>
        //                         <TickCircle className="mr-2" size="20" color="white" variant="Bold" /> Selected
        //                     </>
        //                 ) : 'Select'}
        //             </button>
        //         </div>
        //     </div>
        //     <h2 className="text-2xl font-bold mb-1">{skip.size} Yard Skip</h2>
        //     <p className="text-gray-600 mb-3 text-sm">{skip.hire_period_days} day hire period</p>
        //     <div className="flex justify-between items-center mb-4">
        //         <p className="text-blue-700 font-bold text-xl">£{skip.price_before_vat}</p>
        //         <span className="text-white bg-blue-700 rounded-2xl px-2 py-1 text-center text-sm">{skip.size} Yards</span>
        //     </div>
        // </div>

        <div
            onClick={select}
            style={{ backgroundImage: `url(https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg)` }}
            className={`border-${selected ? '3' : '2'} cursor-${isDisabled ? 'not-allowed' : 'pointer'} border-${selected ? 'blue-700' : 'gray-700'} hover:border-blue-600 relative h-96 shadow-md bg-cover bg-center rounded-lg`}>
            <div className="w-full rounded-lg h-full bg-black opacity-40" />
            {contextHolder}
            <div className="absolute top-0 p-6 w-full h-full">
                <h2 className="text-2xl text-white font-bold mb-2">{skip.size} Yard Skip</h2>
                <p className="text-white mb-[13rem]">{skip.hire_period_days} day hire period</p>
                {
                    showWarnings && (
                        <div className="absolute right-4 top-4">
                            {
                                !skip.allowed_on_road && (
                                    <div className="rounded-lg bg-gray-200 py-2 px-2 mb-2">
                                        <Tooltip title="Skip is not allowed on Road">
                                            <Warning2 color="yellow" size={24} variant="Bold" />
                                        </Tooltip>
                                    </div>
                                )
                            }
                            {
                                !skip.allows_heavy_waste && (
                                    <div className="rounded-lg bg-gray-200 py-2 px-2">
                                        <Tooltip title="Skip is not suitable for heavy waste">
                                            <Warning2 color="red" size={24} variant="Bold" />
                                        </Tooltip>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                <div className="flex justify-between items-center">
                    <p className="text-white font-bold text-3xl">£{skip.price_before_vat}</p>
                    {
                        isDisabled ? (
                            <Tooltip title="This skip is not suitable for heavy waste and is also not allowed on road.">
                                <button className="bg-gray-500 cursor-not-allowed rounded-full p-4">
                                    <Warning2 color='white' size={30} />
                                </button>
                            </Tooltip>
                        ) : (
                            <button className={`bg-${selected ? 'black' : 'blue-600'} cursor-pointer rounded-full p-4`}>
                                <ArrowRight color='white' size={30} />
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SkipCard;