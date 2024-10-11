/* const filed = document.getElementById('field');
function saveToLocalStorage(key,valeur){
    const existdonnee = JSON.parse(localStorage.getItem(key)) || [] ;
    existdonnee.push(valeur);
    localStorage.setItem(key, JSON.stringify(existdonnee)) ;
}

if(filed){
    filed.addEventListener("submit", function (event){
        event.preventDefault();
        const fieldDonnee = {
            name: document.getElementById('name').value ,
            pUnit: document.getElementById('unit').vlue ,
            qte: document.getElementById('qte').value ,
        }
        saveToLocalStorage("produits",fieldDonnee);
    })
} */

let tabInLocalStorage = localStorage.getItem('productList')
if(!tabInLocalStorage) localStorage.setItem('productList', JSON.stringify([]))

const PRODUCT_REVIEW = {
    productList: JSON.parse(tabInLocalStorage),
    submitForm: ()=>{
        const form = document.getElementById('filed')
        if(form){
            form.addEventListener('submit', e=>{
                e.preventDefault()
                let nameField = form.querySelector('input#name').value
                let unitField = form.querySelector('input#unit').value
                let qteField = form.querySelector('input#qte').value
                if(nameField == "" || unitField == "" || qteField == "" ){
                    alert("veuillez saisir tous les champs") 
                }else{
                    let totalPrice = parseInt(unitField) * parseInt(qteField)
                    const productObject = {
                        name:nameField,
                        unitPrice:unitField,
                        qte: qteField,
                        totalPrice: totalPrice
                    }
                    PRODUCT_REVIEW.productList.push(productObject)
                    localStorage.setItem('productList', JSON.stringify(PRODUCT_REVIEW.productList))
                    window.open("http://127.0.0.1:5502/page2.html", '_blank')
                }

            })

        }
    },
    displayProductList: ()=>{
        const bodyTag = document.querySelector('tbody')
        if(bodyTag){
            let productItem = ``
            let total = 0
            if(PRODUCT_REVIEW.productList.length>0){
                PRODUCT_REVIEW.productList.forEach((item, index) => {
                    productItem += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.name}</td>
                            <td>${item.unitPrice}</td>
                            <td>${item.qte}</td>
                            <td>${item.totalPrice}</td>
                        </tr>
                    `
                })
                total = PRODUCT_REVIEW.productList.reduce((a, c) => a + parseInt(c.totalPrice), 0)
            }else{
                productItem = `
                    <tr>
                        <td colspan=5 style='text-align:center;'>Aucune information disponible.</td>
                    </tr>
                `
                total = 0
            }
            bodyTag.innerHTML = productItem

            document.querySelector('.total').innerHTML = `Total: ${total} XOF`
        }
    }
}
const url = window.location
if(url.pathname==='/page1.html'){
    PRODUCT_REVIEW.submitForm()
}else if(url.pathname==='/page2.html'){
    PRODUCT_REVIEW.displayProductList()
}
