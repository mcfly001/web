/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = g_lang;

/**
 * 执行页面i18n方法
 * @return
 */
function loadProperties() {
    $.i18n.properties({
        name:'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
        path:'../i18n/',   //注意这里路径是你属性文件的所在文件夹
        mode:'map',
        language:i18nLanguage,     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
        callback:function(){
            $("[data-key]").each(function(){
                $(this).html($.i18n.prop($(this).data("key")));

            });
        }
    });
}

/*页面执行加载执行*/
$(function(){
    /*执行I18n翻译*/
    loadProperties();
    //lang_alert("TMP:001", "en")
});
