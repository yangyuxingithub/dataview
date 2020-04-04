/*
 * @Author: Yuxin Yang 
 * @Date: 2020-04-04 10:24:09 
 * @Last Modified by: Yuxin Yang
 * @Last Modified time: 2020-04-04 16:26:02
 */

var localData;

$(function () {

    initDataView();
    var ores = localData.result;
    // 调用渲染主题方法
    initTheme(ores);
    // initLine();
    // 调用渲染饼图的方法,默认选中第一个
    initPie(ores[0]['媒体']);
    // 调用渲染标题的方法,默认选中第一个
    initTitle(ores[0]['媒体']);

    // 点击主题切换对应数据
    $("body").on("click", ".data-box-title", function () {
        var oindex = $(this).index();
        $(".data-box-title").removeClass("chose-on");
        $(this).addClass("chose-on");
        var opiedata = ores[oindex]['媒体'];
        // 调用渲染饼图的方法
        initPie(opiedata);
        // 调用渲染标题的方法,
        initTitle(opiedata);
    });

});


/**
 * 初始化数据渲染
 * */
function initDataView() {
    $.ajax({
        url: './javascript/index.json',
        type: 'get',
        async: false,
        dataType: 'json',
        data: '',
        success: function (res) {
            // 默认数据请求成功
            console.log(res);
            localData = res;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// 渲染主题
function initTheme(params) {
    var oHtml = '';
    for (let index = 0; index < params.length; index++) {
        if (index == 0) {
            oHtml += '<div class="data-box-title chose-on">' + params[index]['主题'] + '</div>'
        } else {
            oHtml += '<div class="data-box-title">' + params[index]['主题'] + '</div>'
        }
    }
    $(".data-box").html(oHtml);
}

// 渲染标题
function initTitle(params) {
    var oHtml = '';
    if (params && params.length > 0) {
        for (var index = 0; index < params.length; index++) {
            console.log(params[index])
            oHtml += '<div class="echarts-box-top-line">媒体名称：' + params[index]['名称'] + '</div>';
            if (params[index]['标题'] && params[index]['标题'].length > 0) {
                for (var o = 0; o < params[index]['标题'].length; o++) {
                    oHtml += '<div class="echarts-box-line">';
                    oHtml += '<span class="echarts-box-text" title="' + params[index]['标题'][o]['title'] + '">' + params[index]['标题'][o]['title'] + '</span>';
                    oHtml += '<span class="echarts-box-time">' + updateTimer(params[index]['标题'][o]['published']) + '</span>';
                    oHtml += '</div>';
                }
            }
        }
    }
    $("#title").html(oHtml);

}


// 渲染数据图表
function initLine() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('line'));
    var option = {
        legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            textStyle: { //图例文字的样式
                color: '#fff',
                fontSize: 12
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff',
                    width: 1,
                    type: 'solid'
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff',
                    width: 1,
                    type: 'solid'
                }
            },
        },
        series: [{
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

// 渲染数据图表
function initPie(od) {

    var legendData = [];
    var seriesDta = [];
    for (let index = 0; index < od.length; index++) {
        legendData.push(od[index]['名称']);
        var onobj = {};
        onobj.name = od[index]['名称'];
        onobj.value = od[index]['报道量'];
        seriesDta.push(onobj);
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('pie'));
    var option = {
        // 配置颜色
        color: ['#C23531', '#91C7AE', '#D48265', '#91C7AE', '#749F83', '#CA8622', '#BDA29A', '#7145e0', '#7EF7CE'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: legendData,
            textStyle: { //图例文字的样式
                color: '#fff',
                fontSize: 12
            }
        },
        series: [{
            name: '报道量所占比例',
            type: 'pie',
            radius: '55%',
            center: ['60%', '50%'],
            data: seriesDta,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };;
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

// 时间戳修改
function updateTimer(t) {
    var ot = t.split('+');
    console.log(ot);
    return ot[0];
}