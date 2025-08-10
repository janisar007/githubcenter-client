

const GroupLogoSquare = (group:any) => {
 
  return (
    <div className='border border-red-500 h-[8rem] w-[8rem] flex items-center justify-center text-black'>
      {group?.groupName}
    </div>
  );
};

export default GroupLogoSquare;