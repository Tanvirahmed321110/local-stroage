function inputValue (id){
    const input = document.getElementById(id);
    const inputVal = input.value;
    return inputVal;
}
 

function submit(){
    event.preventDefault()
    
    const nameValue = inputValue('input-name');
    const emailValue = inputValue('input-email');
    const passwordValue = inputValue('input-password')
    
    const errorText = document.getElementById('error-text')
    const nameEmailDisplay = document.querySelectorAll('p')
    const user = document.querySelector('.output h5')
    
    let nameDisplay = nameEmailDisplay[0]
    let emailDisplay = nameEmailDisplay[1]
    let passwordDisplay = nameEmailDisplay[2]
    console.log(nameDisplay,emailDisplay,passwordDisplay)
    
    const templateParams = {
        nameValue: nameValue,
        emailValue: emailValue,
        passwordValue: passwordValue
    };
    
    
    if(nameValue && emailValue && passwordValue){
        user.innerText='Form Submited by -' +nameValue
        
        nameDisplay.innerText = 'Name : '+nameValue;
        emailDisplay.innerText = 'Email : '+emailValue
        passwordDisplay.innerText = 'Password : '+passwordValue
        errorText.innerHTML='';
        
        // main js code
        emailjs.send('service_test_1', 'template_aw9desn', templateParams)
        .then((res)=>{alert('Sucessfully send')}),
        (error)=>{
            alert('Faild submit')
        }
        

        // clear input
        // inputName.value=''
        // inputEmail.value=''
    }
    else{
        errorText.innerHTML = `<h5 class="text-warning">Please fill frield</h5>`
    }
}

document.getElementById('btn-submit').addEventListener('click',submit)