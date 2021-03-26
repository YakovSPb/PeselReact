import * as axios from "axios";



const instance = axios.create({
    baseURL: 'https://api.thedogapi.com/v1/',
    headers: {
        "Content-Type": "application/json",
        "X-API-Key": 'a65a8739-f0bc-4c2e-8606-7045ff5b9eef'
    }
})

const refactorDogObj = (dog, favoriteDog) => {
    let objDog = {}

    if (dog.breeds[0] != undefined) {
        objDog = {image_id: dog.id, name: dog.breeds[0].name, url: dog.url, temperament: dog.breeds[0].temperament, weight: dog.breeds[0].weight.metric, height: dog.breeds[0].height.metric}
    } else {
        objDog = {image_id: dog.id, name: '', url: dog.url, temperament: '', weight: '', height:''}
    }

    if(favoriteDog != undefined) {
        objDog['favorite'] = true;
        objDog['id'] = favoriteDog.id
    } else{
        objDog['favorite'] = false;
    }
    return objDog;
}


export const dogsAPI = {
    async getDogs(typeImg, pageSize, currentPage, favoriteDogArr) {

        let dogResponse = await axios.get(`https://api.thedogapi.com/v1/images/search?mime_types=${typeImg ? 'jpg,png' : 'gif'}&limit=${pageSize}&page=${currentPage}&order=Desc`);

            return dogResponse.data.map(dog => {

                let favoriteDog = favoriteDogArr.find(fDog=>fDog.image_id === dog.id)

                return refactorDogObj(dog, favoriteDog);

            })

    },
    getBreeds(){
        return instance.get('breeds').then(response => {
            return response.data;
        })
    },

    saveFovourite(image_id){
       return instance.post('favourites', {image_id: image_id,sub_id: "User-123"}).then(response=>{
           return response.data
       })
    },

    deleteFovourite(favourite_id){
        return instance.delete('favourites/' + favourite_id)
    },



    getAllFovourite(){
        return instance.get('favourites', { params: {order: 'DESC'} } ).then(response => {
            return response.data.map(dog=> ({...dog, favorite: true  }));
        })
    },


    testFavorite(idDog) {
        return instance.get('favourites', { params: {image_id: idDog} } ).then(response => {
            return response.data;
        })
    },


    getSingleDog(idDog, favoriteDogArr) {
       return instance.get(`images/` + idDog).then(response => {

           let dogProfile = response.data;



           if (dogProfile.breeds != undefined) {
               dogProfile =  {image_id: dogProfile.id, name: dogProfile.breeds[0].name, url: dogProfile.url, temperament: dogProfile.breeds[0].temperament, weight: dogProfile.breeds[0].weight.metric, height: dogProfile.breeds[0].height.metric}
           } else {
               dogProfile = {image_id: dogProfile.id, name: '', url: dogProfile.url, temperament: '', weight: '', height: ''}
           }

           let find = favoriteDogArr.find(fDog=>fDog.image_id === dogProfile.image_id)


           if(find != undefined) {
               dogProfile['favorite'] = true;
               dogProfile['id'] = find.id
           } else{
               dogProfile['favorite'] = false;
           }
           return dogProfile;

        });
    },

    getDogsByBreed(idBreed, favoriteDogArr) {
        return instance.get(`/images/search?breed_ids=${idBreed}&limit=100`).then(response => {
            return response.data.map(dog => {

                let favoriteDog = favoriteDogArr.find(fDog=>fDog.image_id === dog.id)

                return refactorDogObj(dog, favoriteDog);

            })
        })
    }



}









