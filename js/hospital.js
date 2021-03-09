
var gubun = null;
var cido = null
var local = null;

$(function () {
    $("#gubun").on("change", function () {
        gubun = $(this).val();
        //console.log(gubun);
    });
    $("#cido").on("change", function () {
        cido = $(this).val();
        //console.log(cido);
    });
    $("#local").on("keyup", function () {
        local = $(this).val();
        //console.log(local);
    });
    $("#button").on("click", function () {
        $(".text").text("");
        $(".table").empty();
        if (gubun !== null && cido !== null && local !== null) {
            $.ajax({
                url: '', //aws API Gateway
                type: "get",
                data: { code: gubun, first: cido, second: local },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.length > 0) {
                        var tb = $("<table/ border=1>");
                        var title = $("<tr/>").append(
                            $("<th/>").text("병원명"),
                            $("<th/>").text("주소"),
                            $("<th/>").text("전화번호"),
                            $("<th/>").text("링크")
                        );
                        tb.append(title);
                        for (var i in data) {
                            var $name = data[i].yadmNm._text;
                            var $location = data[i].sidoNm._text + " " + data[i].sgguNm._text;
                            var $tel = data[i].telno._text;
                            var $link = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=" + $name;
                            var row = $("<tr/>").append(
                                $("<td/>").text($name).css("text-align", "center"),
                                $("<td/>").text($location).css("text-align", "center"),
                                $("<td/>").text($tel).css("text-align", "center"),
                                $("<a href='#''>").text("링크").css("text-align", "center").attr('href', $link).attr('target', '_blank')
                            );
                            tb.append(row);
                        }
                        tb.width("800px").height("100px");
                        $(".table").append(tb);
                    } else {
                        $(".text").text("검색결과가 없습니다.")
                    }
                },
                error: function () {
                    console.log("err");
                }
            });
        } else {
            console.log("오류");
        }
    })
});