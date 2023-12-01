export const getdatafromlocalstorage = () =>{
     const data = localStorage.getItem('clothList')
    if(data){
     return JSON.parse(data)
    }
    return []
}