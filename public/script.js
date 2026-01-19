// Emoji animation
const emojis = ['😀','🔥','💛','🚀','✨','🎉'];
const container = document.querySelector('.emoji-container');

for (let i = 0; i < 30; i++) {
  const e = document.createElement('div');
  e.className = 'emoji';
  e.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  e.style.left = Math.random() * 100 + 'vw';
  e.style.animationDuration = 5 + Math.random() * 10 + 's';
  container.appendChild(e);
}

// Fetch Facebook image
async function fetchPic() {
  const link = document.getElementById('link').value.trim();
  const resBox = document.getElementById('result');

  if (!link) {
    resBox.innerText = 'Please paste a Facebook link';
    return;
  }

  resBox.innerText = 'Loading...';

  try {
    const res = await fetch('/api/all?url=' + encodeURIComponent(link));
    const data = await res.json();

    if (data.profile_picture && data.profile_picture.hd) {
      resBox.innerHTML = `
        <img src="${data.profile_picture.hd}" alt="Preview"><br>
        <button onclick="forceDownload('${data.profile_picture.hd}')">
          Download
        </button>
      `;
    } else {
      resBox.innerText = 'Image not found';
    }

  } catch (err) {
    console.error(err);
    resBox.innerText = 'Error fetching image';
  }
}

// Force download (works for fbcdn links)
async function forceDownload(url) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'facebook_image.jpg';
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch (e) {
    alert('Download failed');
  }
}
