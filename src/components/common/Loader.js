const Loader = ({ dashboard }) => {
    return dashboard ? (<div className="w-full min-h-[calc(100vh-4rem)] ml-[60px] sm:ml-0 my-auto flex justify-center items-center">
        <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>) : (
        <div className="w-screen min-h-[calc(100vh)] flex justify-center items-center pt-[4rem]">
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader