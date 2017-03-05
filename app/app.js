$(document).ready(function () {

    console.log("ready");
    var app = {
        url: null,
        pseudo: null,
        password: null,
        connexion: [],
        init: function () {
            app.listener()
            app.url = "data/users.json"
        },
        listener: function () {
            console.log("coucou");
            $("#btnsend").on("click", function (e) {
                app.getUsers(app.url);
            })
        },
        getUsers: function (url) {
            $.ajax({
                url: url,
                success: app.connect,
                error: function (err) { if (err) console.log(err) }
            })
        },
        connect: function (data) {
            app.pseudo = $("#pseudo").val()
            app.password = $("#pass").val()
            app.connexion.push({ username: app.pseudo, password: app.password })
            console.log(app.connexion)
            data.Users.map(function (i) {
                console.log(i)
                if (i.username === app.pseudo && i.password === app.password) {
                    console.log(i.color)
                    app.append(i.color);
                } else {
                    console.log("bah non")
                }
            })
        },
        append: function (color) {
            $("*").css("color", color)
        }
    }
    app.init()

});