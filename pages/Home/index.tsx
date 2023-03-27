import {FC} from 'react'

// Redux & Actions
import { useAppSelector } from "@/utility/hooks"

// Components
import Hotels  from "../Hotels";
import Travelers  from "../Travelers";

interface HomeProos {}

const Home: FC<HomeProos> = ({}) => {
  const store = useAppSelector(
    (state) => state?.user ?? {}
  ) as any

  return (
    <div>
      {store?.loginType ? <Hotels/> : <Travelers /> }
    </div>
  )
}

export default Home
