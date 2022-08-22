import Message from './Message'
import TimeLine from './TimeLine'
import Setting from './Setting'
import Ranking from './Ranking'
import Sidebar from '../sidebar/Sidebar'
import SignOut from '../user/SignOut'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard--body'>
      <Sidebar />
      <TimeLine />
      <Message />
      <Ranking />
      <Setting />
      <SignOut />
    </div>
  )
}

export default Dashboard