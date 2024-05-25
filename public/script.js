let loggedIn=false
let userName=''
const socket=io.connect(window.location.origin)
const form=document.querySelector('#form')
const messages=document.querySelector('#messages')
if(!loggedIn){
    document.querySelector('#join').addEventListener('click',()=>{
        const username=document.querySelector('#username').value
        if(username===""){
            alert('Enter Name')
        }
        else{
            userName=username
            messages.style.display='block'
            form.style.display='block'
            document.querySelector('#user').style.display='none'
            loggedIn=true
            socket.emit('connection',{username})
        }
    })
}
socket.on('connection',(name)=>{
    alert(name.username,' has joined')
})
document.getElementById('submit').addEventListener('click',(e)=>{
    e.preventDefault()
    const input=document.getElementById('message')
    if(input.value==='')
        alert('Enter the message')
    else{
        socket.emit('chat',{message:input.value,username:userName})
        input.value=''
    }
})
socket.on('chat',(msg)=>{
    const message=document.createElement('li')
    message.style.cssText='list-style-type:none;width:100%'
    
    if(msg.username===userName){
        message.innerText=`You: ${msg.message}`
        message.style.cssText=`text-align:right;margin:5px 10px`
    }
    else{
        message.innerText=`${msg.username}:${msg.message}`
        message.style.cssText=`text-align:left;margin:5px 10px`
    }
    messages.appendChild(message)
})

