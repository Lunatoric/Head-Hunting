const sortingstyle = document.getElementById("sortingstyle")

function Displaydata () {
    var params = new URLSearchParams({search: sortingstyle.options[sortingstyle.selectedIndex].value})
    document.getElementById(`bosses`).innerHTML = ``
    fetch(`/api/gamelist?${params}`).then(response => response.json()).then(
        rows => rows.forEach(row => {
            const bosssite = new URLSearchParams({game : row.game})
            document.getElementById(`bosses`).innerHTML += `<li>
            <div  class="tooltip">
                <div class="outline">
                    <a href="/gameboss?${bosssite}">
                        <h1 class="bosstitle">${row.game}</h1>
                    </a>
                </div>
            </div></li>`
        })
    );
}

sortingstyle.onload = Displaydata
sortingstyle.onchange = Displaydata