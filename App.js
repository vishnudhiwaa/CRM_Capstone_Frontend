
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import ActivateAccount from './Components/AuthComponents/ActivateAccount';
import CustomerDashboard from './Components/Customer/CustomerDashboard';
import About from './Components/Default/About';
import Products from './Components/Default/Products';
import Pricing from './Components/Default/Pricing';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AppLayout from './AppLayout';
import RoutePermission from './RoutePermission';
import { USER_ROLES } from './Data/Roles';
import Unauthorized from './Components/Default/Unauthorized';
import ProfilePicWrapper from './Components/Default/ProfilePicWrapper';
import BuyProducts from './Components/Customer/BuyProducts';
import OrderHisory from './Components/Customer/OrderHistory';
import RequestHistory from './Components/Customer/RequestHistory';
import ForgotPwd from './Components/AuthComponents/ForgotPwd';
import ActivateEmail from './Components/AuthComponents/ActivateEmail';
import ForgotPwdAuth from './Components/AuthComponents/ForgotPwdAuth';
import ResetPwd from './Components/AuthComponents/ResetPwd';
import ProfileWrapper from './Components/Default/ProfileWrapper';
import EnggDashboard from './Components/Engineer/EnggDashboard';
import PendingReqWrapper from './Components/Engineer/PendingReqWrapper';
import AssignedReqWrapper from './Components/Engineer/AssignedReqWrapper';
import ClosedReqWrapper from './Components/Engineer/ClosedReqWrapper';
import EnggChartWrapper from './Components/Engineer/EnggChartWrapper';
import CartWrapper from './Components/Customer/CartWrapper';
import SalesDashboard from './Components/Sales/SalesDashboard';
import PendingOdWrapper from './Components/Sales/PendingOdWrapper';
import MonthlyOdWrapper from './Components/Sales/MonthlyOdWrapper';
import CancelOdWrapper from './Components/Sales/CancelOdWrapper';
import SalesChartWrapper from './Components/Sales/SalesChartWrapper';
import RequestsDataWrap from './Components/Admin/RequestsDataWrap';
import AddProductWrapper from './Components/Admin/AddProductWrapper';
import AddEmployeeWrapper from './Components/Admin/AddEmployeeWrapper';
import YearlyRevWrap from './Components/Admin/YearlyRevWrap';
import PendingOdWrap from './Components/Admin/PendingOdWrap';
import MktDashboard from './Components/Marketing/MktDashboard';
import MonthlyOdWrap from './Components/Admin/MonthlyOdWrap';
import RevenueChartWrap from './Components/Admin/RevenueChartWrap';
import AllLeadWrapper from './Components/Marketing/AllLeadWrapper';
import AddLeadWrap from './Components/Marketing/AddLeadWrap';
import EditLeadWrap from './Components/Marketing/EditLeadWrap';
import CustEmail from './Components/Marketing/CustEmail';

function App() {
  const USER_ROLES_VALUES = Object.values(USER_ROLES);

  return (
    <div className="App">  
       <Routes>

         <Route path='/' element={ <AppLayout />}>
         <Route path='/' element={ <Home />}></Route>
         <Route path='/about' element={ <About />}></Route>
         <Route path='/products' element={ <Products />}></Route>
         <Route path='/activate/:id' element={ <ActivateAccount />}></Route> 
         <Route path='/reset-pwd/:id/:token' element={ <ResetPwd />}></Route> 
         <Route path='/forgot-password' element={ <ForgotPwd />}></Route> 
         <Route path='/forgotpwd/authorize' element={ <ForgotPwdAuth />}></Route> 
         <Route path='/activate-mail' element={ <ActivateEmail />}></Route> 
         <Route path='/unauthorized' element={ <Unauthorized />} />
         
         {/* common route  */}
        <Route element= { <RoutePermission allowedRoles={USER_ROLES_VALUES} />}>
           <Route path='/profile' element= {<ProfileWrapper />} />
           <Route path='/profile-pic' element= {< ProfilePicWrapper />} />
        </Route>

         {/* Customer Routes */}
         <Route element= { <RoutePermission allowedRoles={[USER_ROLES.Customer]} />}>
          <Route path= '/cust-dashboard' element={ <CustomerDashboard />}></Route>
          <Route path= '/buy-product' element={ <BuyProducts />}></Route>
          <Route path= '/cart' element={ <CartWrapper />}></Route>
          <Route path= '/order-hist' element={ <OrderHisory />}></Route>
          <Route path= '/req-hist' element={ <RequestHistory />}></Route>
         </Route>

        {/* Admin Routes */}
        <Route element= { <RoutePermission allowedRoles={[USER_ROLES.Admin]} />}>
          <Route path= '/admin-dashboard' element={ <AdminDashboard />}></Route>
          <Route path= '/requests-chart' element={ <RequestsDataWrap />}></Route>
          <Route path= '/revenue-chart' element={ <YearlyRevWrap />}></Route>
          <Route path= '/total-revenue' element={ <RevenueChartWrap />}></Route>
          <Route path='/add-product' element={<AddProductWrapper />}></Route>
          <Route path='/add-employee' element={<AddEmployeeWrapper />}></Route>
          <Route path='/pending-adm' element={<PendingOdWrap />}></Route>
          <Route path='/monthOD-adm' element={<MonthlyOdWrap />}></Route>
        </Route>
        
          {/* admin and engg route */}
          <Route element= { <RoutePermission allowedRoles={[USER_ROLES.Engineer, USER_ROLES.Admin]} />}>
          <Route path= '/req-pending' element={ <PendingReqWrapper />}></Route>
          <Route path= '/req-assigned' element={ <AssignedReqWrapper />}></Route>
          <Route path= '/req-closed' element={ <ClosedReqWrapper />}></Route>
            </Route>

        {/* service engineer routes */}
        <Route element= { <RoutePermission allowedRoles={[USER_ROLES.Engineer]} />}>
          <Route path= '/engg-dashboard' element={ <EnggDashboard />}></Route>
         
          <Route path= '/engg-chart' element={ <EnggChartWrapper />}></Route>
        </Route> 

        {/* Sales team routes */}
        <Route element= { <RoutePermission allowedRoles={[USER_ROLES.Sales]} />}>
          <Route path= '/sales-dashboard' element={ <SalesDashboard />}></Route>
          <Route path= '/od-pending' element={ <PendingOdWrapper />}></Route>
          <Route path= '/od-cancelreq' element={ <CancelOdWrapper />}></Route>
          <Route path= '/od-monthly' element={ <MonthlyOdWrapper />}></Route>
          <Route path= '/sales-chart' element={ <SalesChartWrapper />}></Route> 
        </Route> 

        {/* for marketing */}
        <Route element= { <RoutePermission allowedRoles={[USER_ROLES.Marketing]} />}>
            <Route path = '/mkt-dashboard' element = {<MktDashboard />} />
            <Route path = '/all-leads' element = {<AllLeadWrapper />} />
            <Route path = '/add-lead' element = {<AddLeadWrap />} />
            <Route path = '/edit-lead' element = {<EditLeadWrap />} />
            <Route path = '/cust-email' element = {<CustEmail />} />
        </Route>



         <Route path="*" element={<h3>404 : Page not found</h3>}></Route>
         </Route>
       </Routes>

   
    </div>
  );
}

export default App;
