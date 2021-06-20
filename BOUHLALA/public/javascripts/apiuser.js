
let currentPage = 1
let limit = 7
let nbElements

function showPaginatedUsers(){

    fetch(`http://localhost:8080?page=${currentPage}&limit=${limit}`,{headers:headers()})
    .then(handleErrors)
     .then(data => {
         $("#usesData").html("");
         usersData = getPagingData(data,currentPage,limit);
         nbElements = usersData.totalItems
         updateButtons()
         usersData.users.forEach(element => {
             createRow(element.id,element.username,element.email,element.password,element.role).appendTo("#usesData")
        });
     })

}