const emojis=['😀','🔥','💛','🚀','✨','🎉'];
const container=document.querySelector('.emoji-container');
for(let i=0;i<30;i++){
 const e=document.createElement('div');
 e.className='emoji';
 e.innerText=emojis[Math.floor(Math.random()*emojis.length)];
 e.style.left=Math.random()*100+'vw';
 e.style.animationDuration=5+Math.random()*10+'s';
 container.appendChild(e);
}

async function fetchPic(){
 const link=document.getElementById('link').value;
 const resBox=document.getElementById('result');
 resBox.innerText='Loading...';
 try{
   const res=await fetch('/api/all?url='+encodeURIComponent(link));
   const data=await res.json();
   if(data.profile_picture?.hd){
  resBox.innerHTML = `
    <img src="${data.profile_picture.hd}"><br>
    <button onclick="forceDownload('${data.profile_picture.hd}')">
      Download
    </button>
  `;
}
Box.innerText='Error';
 }
}
async function forceDownload(url){
  const res = await fetch(url);
  const blob = await res.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "facebook_image.jpg";
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(blobUrl);
}
