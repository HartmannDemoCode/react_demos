/**
 * Created by tha on 14-10-2017.
 */
const URL = 'http://localhost:4000/cars/';

const FacadeWithAwait = () => {

    const getCars = async () => {
        const data = await fetch(URL, {method: 'GET'}).then(res=>fetchWithErrorCheck(res));
        return data;        
    }
    const getCar = async (id) => {
        const data = await fetch(URL+id, {method: 'GET'}).then(res=>fetchWithErrorCheck(res));
        return data;        
    }
    const createCar = async (car) => {
        const carMinusId = {...car};
        delete carMinusId.id;
        const data = await fetch(URL,
            {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(carMinusId)
            }
        ).then(res=>fetchWithErrorCheck(res));
        return data;    
    }
    const editCar = async (car) => {
        const data = await fetch(URL+'/'+car.id, {
            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(car)
        }).then(res=>fetchWithErrorCheck(res));
        return data;  
    }

    const deleteCar = async (id) => {
        const data = await fetch(URL+'/'+id, {
            method: 'DELETE',
        }).then(res=>fetchWithErrorCheck(res));
        return data;  
    };
    const fetchWithErrorCheck = (res) => {
        if(!res.ok){
          return Promise.reject({status: res.status, fullError: res.json() })
        }
        return res.json();
    }
    return {
        getCars,
        getCar,
        createCar,
        editCar,
        deleteCar
    }
}
export default FacadeWithAwait();