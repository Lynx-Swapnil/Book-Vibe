import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
    const error = useRouteError();
    const status = error?.status || 404;
    const message =
        error?.status === 404
            ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
            : error?.statusText ||
                error?.message ||
                "Something unexpected happened while loading this page.";

    return (
        <section className="min-h-screen bg-transparent px-4 py-8 lg:py-12">
            <div className="mx-auto w-11/12 max-w-6xl">
                <div className="rounded-3xl border border-[#f2dccb] bg-linear-to-br from-[#fff5eb] via-[#fffaf6] to-[#e7f8f4] px-6 py-14 text-center shadow-[0_20px_40px_rgba(95,61,33,0.12)] lg:px-14 lg:py-16">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8a6b58]">
                        Error {status}
                    </p>

                    <h1 className="title-font mt-4 text-4xl font-black leading-tight text-[#2f2118] sm:text-5xl lg:text-6xl">
                        Page not found
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#654c3c] sm:text-lg">
                        {message}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            to="/"
                            className="btn h-11 min-h-11 rounded-full border-0 bg-orange-500 px-7 text-white hover:bg-orange-600"
                        >
                            Back to Homepage
                        </Link>
                        <Link
                            to="/books"
                            className="btn h-11 min-h-11 rounded-full border border-teal-600 bg-white px-7 text-teal-700 hover:bg-teal-50"
                        >
                            Go to Listed Books
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;