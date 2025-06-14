'use client';

import { useEffect, useState } from 'react';
import { Drawer, Spin, StepProps, Steps } from 'antd';
import { Location, Trash, Truck, Security, Calendar, Card, ArrowLeft, ArrowRight } from 'iconsax-react';

import { SkipModel } from '@/lib/types';

import SkipCard from '@/components/SkipCard';
import { determineErrorMessage } from '@/lib/utils';
import { fetchSkips } from '@/lib/services/skip.service';

const Home = () => {
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [skips, setSkips] = useState<SkipModel[]>([]);
    const [selected, setSelected] = useState<SkipModel | null>(null);

    const steps: StepProps[] = [
        {
            title: 'Postcode',
            status: 'finish',
            icon: <Location color='blue' size={30} />,
        },
        {
            title: 'Waste Type',
            status: 'finish',
            icon: <Trash color='blue' size={30} />,
        },
        {
            title: 'Select Skip',
            status: 'process',
            icon: <Truck color='blue' size={30} />,
        },
        {
            title: 'Permit Check',
            status: 'wait',
            icon: <Security color='blue' size={30} />,
        },
        {
            title: 'Choose Date',
            status: 'wait',
            icon: <Calendar color='blue' size={30} />,
        },
        {
            title: 'Payment',
            status: 'wait',
            icon: <Card color='blue' size={30} />,
        },
    ];

    const select = (skip: SkipModel) => {
        setSelected(skip);
        // setCurrent(2);
    }

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const { data, error } = await fetchSkips();
            setLoading(false);
            if (error) {
                setError(determineErrorMessage(error));
            } else {
                setSkips(data);
            }
        }

        fetch();
    }, []);

    return (
        <div className="flex justify-center w-full min-h-screen py-6">
            <div className="w-full px-4 sm:px-0 sm:w-5/6 lg:w-2/3">
                <Steps current={current} items={steps} />
                <div className="text-center my-4">
                    <h1 className="text-2xl font-bold mb-4">Choose Your Skip Size</h1>
                    <p className="text-gray-600 mb-8">Select the skip size that best suits your needs.</p>
                </div>
                {
                    loading ? (
                        <div className="text-center my-4">
                            <Spin size="large" />
                        </div>
                    )
                    : error? (
                        <div className="text-center my-4">
                            <p className="text-gray-600 mb-8">Error: {error}</p>
                        </div>
                    )
                    : skips.length > 0? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                skips.map((skip, index) => (
                                    <SkipCard 
                                        key={index} 
                                        skip={skip}
                                        onClick={select}
                                        selected={skip.id === selected?.id} />
                                ))
                            }
                        </div>
                    )
                    : (
                        <div className="text-center my-4">
                            <p className="text-gray-600 mb-8">No skips found</p>
                        </div>
                    )
                }
            </div>
            <Drawer
                placement="bottom"
                closable={false}
                height={150}
                open={selected !== null}
                onClose={() => setSelected(null)}>
                <div className="flex justify-center">
                    <div className="w-full flex items-center px-4 sm:px-0 sm:w-5/6 lg:w-2/3">
                        <div className="hidden sm:block flex-1">
                            <img className="h-28 rounded-lg" src={ `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${selected?.size}-yarder-skip.jpg`} />
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
                                    <button onClick={() => setSelected(null)} className="bg-none text-blue-700 cursor-pointer text-base font-semibold items-center flex rounded-xl px-4 py-2">
                                        <ArrowLeft className="mr-2" color='#1447e6' size={18} /> Back
                                    </button>
                                    <button onClick={() => setSelected(null)} className="ml-2 bg-blue-700 text-white cursor-pointer text-base font-semibold items-center flex rounded-xl px-4 py-2">
                                        Continue <ArrowRight className="ml-2" color='white' size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default Home;