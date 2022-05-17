import React, {Component, ReactElement} from 'react';

const FindACounsellorPage = (): ReactElement => { return <div>find a counsellor stub</div>}
//
// // import React, { Fragment } from "react";
// // import FilterContainer from "../components/FilterContainer";
// // import useHttpRequest from "../hooks/HttpRequest";
// // import { Spinner } from "../components/Spinner";
// // import CardList from "../components/Card/CardList";
// // import { SKIP } from "../constants/skip";
// import { useLocation } from "react-router-dom";
// // import { AuthContext } from "../context/auth-context";
//
// // todo: figure out what skip is...
// export const SKIP = 25;
//
// const ajaxUrl = "http://localhost:5000/api/v2/counselors";

//
//
// const FindACounsellorPage = (): ReactElement => {
//
//     const [isSelected, setIsSelected] = React.useState([]);
//     const [query, setQuery] = React.useState(""); // represents everything after the ? in a query. ex: api/counselor? ${query}
//     const [page, setPage] = React.useState(1);
//     const [perPage, setPerPage] = React.useState(SKIP);
//     const [roleVal, setRoleVal] = React.useState("Counselor");
//     const [currentProfile, setCurrentProfile] = React.useState("");
//     const location = useLocation();
//     const auth = React.useContext(AuthContext);
//     var scrollPosition = null;
//     // put loading, error data back here if doesn't work
//
//     React.useEffect(() => {
//         if (location.perPage) {
//             setPerPage(location.perPage);
//             location.perPage = null;
//         } else {
//             setPerPage(SKIP);
//         }
//         location.dropdown = null;
//         if (location.query) {
//             location.dropdown = [];
//             location.inPerson = [];
//             setQuery(location.query);
//             var queryCategories = location.query.split('&');
//             for (const category of queryCategories) {
//
//                 if (!['price', 'in_person', 'province', 'city', 'roles'].includes(category.split('=')[0])) {
//                     var menuNumber;
//                     switch (category.split('=')[0]) {
//                         case 'gender':
//                             menuNumber = 0;
//                             break;
//                         case 'issues':
//                             menuNumber = 1;
//                             break;
//                         case 'approach':
//                             menuNumber = 2;
//                             break;
//                         case 'languages':
//                             menuNumber = 3;
//                     }
//                     var chosen = category.split('=')[1].split(',');
//                     for (const [key, value] of filters[menuNumber]['list'].entries()) {
//                         if (chosen.includes(value.replace(/ /g, "_").toLowerCase())) {
//                             location.dropdown.push("checkbox_" + (menuNumber + 1) + "_" + (key + 1));
//                         }
//                     }
//                 } else if (['in_person', 'province', 'city'].includes(category.split('=')[0])) {
//                     location.inPerson.push(category.split('=')[1]);
//                 } else if (category.split('=')[0] == 'price') {
//                     location.price = category.split('=')[1];
//                 } else if (category.split('=')[0] == 'roles') {
//                     location.role = category.split('=')[1];
//                 }
//             }
//             location.query = null;
//         } else {
//             setQuery(query);
//         }
//
//     }, [query]);
//
//     if (query == "") {
//         setQuery("roles=counselor");
//     }
//     const {loading, error, data} = useHttpRequest(
//         `${ajaxUrl}?${location.query ? location.query : query}&page=${page}&per_page=${location.perPage ? location.perPage : perPage}&`
//     );
//
//
//     return (
//         <div>
//             <div id="filterPage">
//                 <div className="row">
//                     <div className="h-25 col-md-12 clearfix">
//                         <h1>
//                             Find a <span style={{color: "var(--secondary_1)"}}>
//               {roleVal == "Counselor" ? 'counselor' : roleVal == "Supervisor" ? 'supervisor' : 'role that fits you'}
//                             .</span>
//                         </h1>
//                         {/* {auth.isLoggedIn == true ?
//             <button className="btn primary-button float-end">
//               GO TO MY FAVORITES
//             </button>
//           : null } */}
//                     </div>
//                 </div>
//
//                 <FilterContainer
//                     filters={filters}
//                     isSelected={isSelected}
//                     setIsSelected={setIsSelected}
//                     setQuery={setQuery}
//                     roleVal={roleVal}
//                     setRoleVal={setRoleVal}
//                     setCurrentProfile={setCurrentProfile}
//                 />
//
//                 <div className="row mt-5 border-top pt-5">
//                     <div style={{marginBottom: "50px"}}>
//                         <small className="text-muted">
//                             {data && <label>{data.total} counselors available</label>}
//                         </small>
//                     </div>
//                 </div>
//
//                 {loading ? (
//                     <Spinner/>
//                 ) : (
//                     <CardList
//                         data={data}
//                         page={page}
//                         setPage={setPage}
//                         perPage={perPage}
//                         setPerPage={setPerPage}
//                         query={query}
//                         scrollPosition={scrollPosition}
//                         roleVal={roleVal}
//                         currentProfile={currentProfile}
//                         setCurrentProfile={setCurrentProfile}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }
//
export default FindACounsellorPage;