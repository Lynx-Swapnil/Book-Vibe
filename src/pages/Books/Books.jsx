import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useSearchParams } from 'react-router';
import 'react-tabs/style/react-tabs.css';
import MarkAsReadList from '../../components/ListedBooks/MarkAsReadList';
import Wishlist from '../../components/ListedBooks/Wishlist';
import { IoChevronDownOutline } from 'react-icons/io5';

const Books = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortingType = searchParams.get('sort') || '';
    const selectedTab = searchParams.get('tab') || 'read';
    const selectedTabIndex = selectedTab === 'wishlist' ? 1 : 0;

    const updateQueryParams = ({ sort, tab }) => {
        const nextParams = new URLSearchParams(searchParams);

        if (sort !== undefined) {
            if (sort) {
                nextParams.set('sort', sort);
            } else {
                nextParams.delete('sort');
            }
        }

        if (tab !== undefined) {
            if (tab) {
                nextParams.set('tab', tab);
            } else {
                nextParams.delete('tab');
            }
        }

        setSearchParams(nextParams, { replace: true });
    };

    const activeSortLabel =
        sortingType === 'rating'
            ? 'Rating'
            : sortingType === 'pages'
                ? 'Number of Pages'
                : sortingType === 'year'
                    ? 'Publisher Year'
                    : 'Default';

    return (
        <section className='w-11/12 max-w-6xl mx-auto my-8'>
            <div className="rounded-3xl border border-[#f2dccb] bg-white/90 p-5 shadow-[0_14px_34px_rgba(110,66,32,0.08)] md:p-6">
            <div className='mb-7 flex flex-col items-center justify-between gap-4 md:flex-row'>
                <div>
                    <h1 className="title-font text-3xl font-black text-[#2f2118] md:text-4xl">Listed Books</h1>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-[#8b6d5a]">Active Sort: {activeSortLabel}</p>
                </div>

                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full border-0 bg-orange-500 px-8 text-base font-semibold text-white hover:bg-orange-600 md:text-lg">
                        <span>Sort by</span>
                        <IoChevronDownOutline className="text-2xl" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu mt-2 w-72 rounded-2xl border border-[#f2dccb] bg-white p-3 text-center text-base font-medium text-[#624938] shadow-xl">
                        <li onClick={() => updateQueryParams({ sort: '' })}><a className="justify-center rounded-lg py-2 hover:bg-[#fff4ea]">Default</a></li>
                        <li onClick={() => updateQueryParams({ sort: 'rating' })}><a className="justify-center rounded-lg py-2 hover:bg-[#fff4ea]">Rating</a></li>
                        <li onClick={() => updateQueryParams({ sort: 'pages' })}><a className="justify-center rounded-lg py-2 hover:bg-[#fff4ea]">Number of pages</a></li>
                        <li onClick={() => updateQueryParams({ sort: 'year' })}><a className="justify-center rounded-lg py-2 hover:bg-[#fff4ea]">Publisher year</a></li>
                    </ul>
                </div>
            </div>
            
            <Tabs
                selectedIndex={selectedTabIndex}
                onSelect={(index) => updateQueryParams({ tab: index === 0 ? 'read' : 'wishlist' })}
            >
                <TabList className="mb-4 flex items-center gap-2 border-b border-[#f2dccb] pb-2">
                    <Tab className="cursor-pointer rounded-full border border-transparent px-6 py-2 text-base font-semibold text-[#7f6353] outline-none transition" selectedClassName="!border-orange-200 !bg-orange-50 !text-orange-700">
                        Read Books
                    </Tab>
                    <Tab className="cursor-pointer rounded-full border border-transparent px-6 py-2 text-base font-semibold text-[#7f6353] outline-none transition" selectedClassName="!border-teal-200 !bg-teal-50 !text-teal-700">
                        Wishlist Books
                    </Tab>
                </TabList>

                <TabPanel>
                    <MarkAsReadList sortingType={sortingType} />
                </TabPanel>
                <TabPanel>
                    <Wishlist sortingType={sortingType} />
                </TabPanel>
            </Tabs>

            </div>
        </section>
    );
};

export default Books;