'use client';

import { Spin, StepProps, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { Location, Trash, Truck, Security, Calendar, Card } from 'iconsax-react';
import { SkipModel } from '@/lib/types';
import SkipCard from '@/components/SkipCard';
import { determineErrorMessage } from '@/lib/utils';

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
        if (loading) return;

        setLoading(true);
        fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setSkips(data);
            })
            .catch((err) => {
                setLoading(false);
                setError(determineErrorMessage(err));
            });
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
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        </div>
    );
}

export default Home;