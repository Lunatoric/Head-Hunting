const params = new URLSearchParams({ game : "Minecraft"})

fetch(`/api/bossgame?${params}`).then(response => response.json()).then(Bosses => console.log(Bosses))


<script>
var killed = <%= rows[0].killed %>
console.log(<%= rows[0].killed %>)
if (killed = "TRUE") {
        const killparent = document.createElement("h5");
        const killchild = document.createTextNode("The triumph is strong, be proud and kill more")
        killparent.appendChild(killchild)
        document.getElementById("killedbox").appendChild(killparent)
 } else {
}
</script>