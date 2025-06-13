import { SkipModel } from "@/lib/types"
import { ArrowRight } from "iconsax-react";

interface Props {
    skip: SkipModel,
    selected: boolean,
    onClick: (skip: SkipModel) => void,
}

const SkipCard = ({ skip, selected, onClick }: Props) => {
    const select = () => onClick(skip);

    return (
        <div
            style={{ backgroundImage: `url(https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg)`}}
            className={ `border-${ selected ? '3' : '2'} border-${ selected ? 'blue-700' : 'gray-700' } hover:border-blue-600 relative h-72 shadow-md bg-cover bg-center rounded-lg` }>
            <div className="w-full rounded-lg h-full bg-black opacity-40" />
            <div className="absolute top-0 p-6 w-full h-full">
                <h2 className="text-2xl text-white font-bold mb-2">{skip.size} Yard Skip</h2>
                <p className="text-white mb-28">{skip.hire_period_days} day hire period</p>
                <div className="flex justify-between items-center">
                    <p className="text-white font-bold text-3xl">£{skip.price_before_vat}</p>
                    <button onClick={ select } className={ `bg-${ selected ? 'black' : 'blue-600'} cursor-pointer rounded-full p-4` }>
                        <ArrowRight color='white' size={30} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SkipCard;