const handleCategory = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories
  `)
    const data = await response.json();

    const btnContainer = document.getElementById('btn-container');
    data.data.forEach((items) => {
        // console.log(items);
        const div = document.createElement("div");
        div.innerHTML = `    
        <div>
           <button onclick="handleButton('${items.category_id}')" class="btn">${items.category}</button>
      </div>         
`
        btnContainer.appendChild(div);

    })

    // console.log(data.data);
}

const handleButton = async (itemsId) => {
    console.log(itemsId)
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${itemsId}`)
    const data = await response.json();
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const convertToHourAndMinute = (second) => {

        const hours = Math.floor((second / (60 * 60)));   
            const remainingSecond = second % 3600;                 
            const minutes = Math.floor(remainingSecond / 60);        
            let result = '';
            if (hours > 0) {
                result += `${hours} hr${hours > 1 ? 's' : ''}` ;
            }
            if (minutes > 0) {
                result += `${minutes} min${minutes > 1 ? 's' : ''}`;

            }
            result += ' ago';
            return result;


    }
    if (itemsId == 1005) {
        const notFound = document.getElementById('not-found');
        notFound.innerHTML = "";
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="flex flex-col justify-center items-center mt-20">
        <div class="flex justify-center items-center">
            <img src="./Icon.png" alt="">
        </div>
        <div class="text-center text-3xl font-bold mt-4 ">
            <p>Oops!! Sorry, There is no <br> content here</p>
        </div>

    </div>

        `
        notFound.appendChild(div);
    }
    data.data.forEach((cards) => {
        // console.log(cards)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-[360px] bg-base-100 shadow-xl">
    
        <figure class="flex flex-col ">
             <div class="relative"> <img class="w-[312px] h-[200px] " src="${cards.thumbnail}" " alt="Shoes" /> </div>
             <div> <p>${cards?.others?.posted_date ? `
             <div class="bg-black text-white p-2 absolute text-[10px] top-[160px] rounded-md" style="white-space: nowrap;">
                 ${convertToHourAndMinute(cards.others.posted_date)}
             </div>` : ""}</p> </div>
        </figure>
    
        <div class="card-body flex items-center">
            
        <div class="flex gap-2">
        <div>
            <img class="w-12 h-12 rounded-3xl" src="${cards.authors[0].profile_picture}" alt=""/>
    
        </div>
    
        <div>
            <div class= "flex" >
                 <p>${cards.title}</p>
                 <p>${cards?.authors[0]?.verified ? `<i class="fa-solid fa-certificate text-blue-500 ml-12"></i>` : ""}</p>
             </div>
            <p>${cards.authors[0].profile_name}</p>
            <p>${cards.others.views} views</p>
        </div>
     </div>
     
    
        </div>
      </div>



    `;
        cardContainer.appendChild(div);

    })

    // console.log(data.data)

}

document.getElementById('btn-blog').addEventListener("click", function(){
window.location.href= "blog.html";


})







handleCategory()

handleButton("1001")