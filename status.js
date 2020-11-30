
$(function () {
    //오늘 날짜
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth() + 1;
    var nowDay = nowDate.getDate();

    if (nowMonth < 10) { nowMonth = "0" + nowMonth; }
    if (nowDay < 10) { nowDay = "0" + nowMonth; }
    var today = nowYear + "" + nowMonth + "" + nowDay;

    //어제 날짜
    nowDate = new Date();
    var yesterDate = nowDate.getTime() - (1 * 24 * 60 * 60 * 1000);
    nowDate.setTime(yesterDate);

    var yesterYear = nowDate.getFullYear();
    var yesterMonth = nowDate.getMonth() + 1;
    var yesterDay = nowDate.getDate();

    

    if (yesterMonth < 10) { yesterMonth = "0" + yesterMonth; }
    if (yesterDay < 10) { yesterDay = "0" + yesterDay; }
    var yester = yesterYear + "" + yesterMonth + "" + yesterDay;

    //ajax
    $.ajax({
        url: "https://a6qsz0b0k7.execute-api.ap-northeast-2.amazonaws.com/2020-11-23/status",
        type: "get",
        data: { sel: '0', today: today, yester: yester },
        dataType: "json",
        success: function (data) {
            //console.log(data); 
            const obj = JSON.parse(data);
            const $items = obj.response.body.items; // item[0] : 오늘, item[1] : 어제

            //today

            var i;
            for (i = 0; i < 5; i++) {
                var $stateDt = $items.item[i].stateDt._text; //기준일
                if ($stateDt === today)
                    break;
            }
            var $decideCnt = $items.item[i].decideCnt._text //확진자 수
            var $clearCnt = $items.item[i].clearCnt._text //격리해제 수
            var $examCnt = $items.item[i].examCnt._text //검사진행 수
            var $deathCnt = $items.item[i].deathCnt._text //사망자 수
            var $accExamCnt = $items.item[i].accExamCnt._text //누적 검사 수

            for (i = 0; i < 5; i++) {
                var $stateDt = $items.item[i].stateDt._text; //기준일
                if ($stateDt === yester)
                    break;
            }
            //yesterday
            var $ydecideCnt = $items.item[i].decideCnt._text //확진자 수
            var $yclearCnt = $items.item[i].clearCnt._text //격리해제 수
            var $yexamCnt = $items.item[i].examCnt._text //검사진행 수
            var $ydeathCnt = $items.item[i].deathCnt._text //사망자 수
            var $yaccExamCnt = $items.item[i].accExamCnt._text //누적 검사 수

            var cgDecide = $decideCnt - $ydecideCnt;
            var cgExam = $examCnt - $yexamCnt;
            var cgClear = $clearCnt - $yclearCnt;
            var cgDeath = $deathCnt - $ydeathCnt;

            $("#decide").text($decideCnt);
            $("#exam").text($examCnt);
            $("#clear").text($clearCnt);
            $("#death").text($deathCnt);
            $("#total").text($accExamCnt);
            $("#incDecide").text(cgDecide + cgDecide > 0 ? `${Math.abs(cgDecide)}▲` : `${Math.abs(cgDecide)}▼`);
            $("#incExam").text(cgExam + cgExam > 0 ? `${Math.abs(cgExam)}▲` : `${Math.abs(cgExam)}▼`);
            $("#incClear").text(cgClear + cgClear > 0 ? `${Math.abs(cgClear)}▲` : `${Math.abs(cgClear)}▼`);
            $("#incDeath").text(cgDeath + cgDeath > 0 ? `${Math.abs(cgDeath)}▲` : `${Math.abs(cgDeath)}▼`);
        },
        error: function () {
            console.log('err');
        }
    });


    $.ajax({
        url: "https://a6qsz0b0k7.execute-api.ap-northeast-2.amazonaws.com/2020-11-23/status",
        type: "get",
        data: { sel: '1', today: today },
        dataType: "json",
        success: function (data) {
            //console.log(data);
            const obj = JSON.parse(data);
            var $items = obj.response.body.items.item;
            $items = $items.slice(0, 19);
            $items.sort(function (a, b) {
                return b.defCnt._text - a.defCnt._text;
            });
            $items.shift();
            //console.log($items);
            var tb = $("<table/ border=1>");
            var title = $("<tr/>").append(
                $("<th/>").text("지역"),
                $("<th/>").text("총확진자"),
                $("<th/>").text("신규확진자")
            );
            tb.append(title);
            if ($items.length > 0) {
                for (var i in $items) {
                    var $gubun = $items[i].gubun._text;
                    var $defCnt = $items[i].defCnt._text;
                    var $incDec = $items[i].incDec._text;

                    var row = $("<tr/>").append(
                        $("<td/>").text($gubun).css("text-align", "center"),
                        $("<td/>").text($defCnt).css("text-align", "center"),
                        $("<td/>").text($incDec).css("text-align", "center")
                    );
                    tb.append(row);
                }
                tb.width("400px").height("600px");
                $(".table").append(tb);
            }
        },
        error: function () {
            console.log('err');
        }
    });
});
