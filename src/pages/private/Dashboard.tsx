import { apiService } from "@/api/apiService";

import { Button } from "@/components/ui/button";


const Dashboard = () => {

  const clickme = async () => {

    try {


      const data = await apiService.checkApi();

      console.log(data);
      
    } catch (error:any) {

      console.log(error)

      throw new Error(error)
      
    }



  }

  return (
    <div className="flex flex-col h-full p-4">
      Dashboard page

      <Button onClick={clickme}>click</Button>
    </div>
  );
};

export default Dashboard;