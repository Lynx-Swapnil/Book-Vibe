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
        <section className="min-h-screen bg-white px-4 py-8 lg:py-12">
            <div className="mx-auto w-11/12 max-w-6xl">
                <div className="rounded-2xl bg-[#f2f2f2] px-6 py-14 text-center lg:px-14 lg:py-16">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                        Error {status}
                    </p>

                    <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Page not found
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
                        {message}
                    </p>

                    <Link
                        to="/"
                        className="btn mt-10 h-12 min-h-12 rounded-lg border-0 bg-green-500 px-8 text-white hover:bg-green-600"
                    >
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;