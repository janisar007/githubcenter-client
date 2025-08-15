
export const NotFoundComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <img
          src="/notfound.svg"
          height={234}
          width={350}
          alt="404"
        />
      </div>
      <div className="mb-[14px] mt-5 text-[2.3rem] font-medium">No Data found!</div>
      <div className="mb-8 text-cgray-ntext">
        There might not be any pull request for this repository.
      </div>
    </div>
  )
}
