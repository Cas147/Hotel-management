import {FC, PropsWithChildren} from "react"

//Components
import Layout from "@/src/components/Layaout/Layaut"

interface HotelDetailProps {
}

const HotelDetail: FC<HotelDetailProps> = (props: PropsWithChildren) => {
  return (
    <Layout title={"Dashboard"}>
      <div className="container px-4 md:p-8 h-full">
        <div className="grid place-content-center h-full">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl my-8">Welcome to Traveler management</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HotelDetail