const sortingstyle = document.getElementById("sortingstyle") // Declare what we are checking (Not the TSA)

function Displaydata () {
    var params = new URLSearchParams({search: sortingstyle.options[sortingstyle.selectedIndex].value}) // Tells the fetch request how to sort the data
    document.getElementById(`bosses`).innerHTML = `` // Clear all previous data in the page
    if (sortingstyle.options[sortingstyle.selectedIndex].value === 'clear') {
        document.getElementById(`bosses`).innerHTML = `<p class='bigtext'>Select a sorting style</p>` // allows data to be cleared
    } else { // So a fetch request is made using the above parameters, which is then received and turned to json
    fetch(`/api/Bosses?${params}`).then(response => response.json()).then(
        rows => rows.forEach(row => { // Which is then iterated upon for all the bosses that are received.
            const bosssite = new URLSearchParams({boss : row.boss_name}) // This allows the bosses to actually be linked
            document.getElementById(`bosses`).innerHTML += // Add the data into the table
            `<li> <div  class="tooltip"> <!-- The Text that's shown before being hovered -->
                <div class="outline"> <!-- Used to give a bit of flair and improved readability to the words -->
                    <a href="/boss?${bosssite}"> <!-- this links to the bosses dedicated page -->
                        <h1>${row.boss_name}</h1> <!-- \${} is how variables are done in text -->
                    </a>
                </div>
                <span class="tooltiptext"> <!-- When the boss name is hovered over it then unveils this -->
                    <div class="sidetoside"> <!-- used to get the aligning just right -->
                        <div class="verticalalign">
                            <p class="bigtext">${row.boss_name}</p>
                            <p class="medtext">From</p>
                            <p class="smltext">${row.game}</p>
                        </div>
                        <img src=${row.image}> <!-- adds in the image -->
                    </div>
                </span>
            </div></li>`
        })
    )};
}

sortingstyle.onchange = Displaydata //makes it so that whenver the selector is changed, the bosses change