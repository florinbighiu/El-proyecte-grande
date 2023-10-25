const Loading = () => {
    return (
        <div className="bg-star-wars-bg bg-cover bg-center min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-t-4 border-b-4 border-yellow-400 rounded-full animate-spin"></div>
                <p className="text-yellow-400 text-2xl mt-4">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;