import React, { useContext } from 'react';
import { Link } from 'react-router';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { BookContext } from '../../context/BookContext';

const trianglePath = (x, y, width, height) => {
  const path = `M${x},${y + height}
    C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height}
    ${x + width}, ${y + height}
    Z`;

  return path;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={trianglePath(x, y, width, height)} stroke="none" fill={fill} />;
};

const colors = ['#1C80E0', '#10B99E', '#F4B625', '#F67C3C', '#EE1111', '#14B8A6', '#3B82F6'];

const PagesToRead = () => {
  const { storedBooks } = useContext(BookContext);

  const chartData = storedBooks.map((book) => ({
    name: book.bookName,
    pages: Number(book.totalPages),
  }));

  const totalPages = chartData.reduce((sum, item) => sum + item.pages, 0);
  const averagePages = chartData.length === 0 ? 0 : Math.round(totalPages / chartData.length);

  if (chartData.length === 0) {
    return (
      <section className="w-11/12 max-w-6xl mx-auto my-8 rounded-3xl border border-[#f2dccb] bg-white/90 px-6 py-20 text-center shadow-[0_16px_35px_rgba(110,66,32,0.08)]">
        <p className="title-font text-3xl text-[#2f2118]">Nothing to chart yet</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6d5545]">
          Mark books as read to see your pages-progress skyline and compare reading volume.
        </p>
        <Link
          to="/"
          className="btn mt-8 h-11 min-h-11 rounded-full border-0 bg-orange-500 px-7 text-white hover:bg-orange-600"
        >
          Browse Books
        </Link>
      </section>
    );
  }

  return (
    <section className="w-11/12 max-w-6xl mx-auto my-8 rounded-3xl border border-[#f2dccb] bg-white/90 px-4 py-6 shadow-[0_16px_35px_rgba(110,66,32,0.08)] sm:px-8 sm:py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="title-font text-3xl text-[#2f2118] sm:text-4xl">Pages to Read</h1>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-[#8a6b58]">
            Your reading progress dashboard
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">Read Books</p>
            <p className="mt-1 text-2xl font-black text-[#2f2118]">{chartData.length}</p>
          </div>
          <div className="rounded-2xl border border-teal-100 bg-teal-50 px-4 py-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">Total Pages</p>
            <p className="mt-1 text-2xl font-black text-[#2f2118]">{totalPages}</p>
          </div>
          <div className="col-span-2 rounded-2xl border border-[#f2dccb] bg-[#fffaf6] px-4 py-3 text-center sm:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6b58]">Avg Pages</p>
            <p className="mt-1 text-2xl font-black text-[#2f2118]">{averagePages}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#f2dccb] bg-[#fffaf6] px-2 py-4 sm:px-4 sm:py-5">
      <div className="h-90 w-full sm:h-110">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 24, right: 16, left: 4, bottom: 20 }}
            barCategoryGap="24%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ead9cd" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#7f6555', fontSize: 12 }}
              interval={0}
              tickLine={false}
              axisLine={false}
              height={48}
            />
            <YAxis
              tick={{ fill: '#8a6b58', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 'dataMax + 12']}
            />
            <Bar dataKey="pages" shape={<TriangleBar />} label={{ position: 'top', fill: '#7a5f4d', fontWeight: 700, fontSize: 11 }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
    </section>
  );
};

export default PagesToRead;
