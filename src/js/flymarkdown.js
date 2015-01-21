window.onload = function(){
    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    navigator.saveBlob = navigator.saveBlob || navigator.msSaveBlob || navigator.mozSaveBlob || navigator.webkitSaveBlob;
    window.saveAs = window.saveAs || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs;

    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        mode: 'gfm',
        lineNumbers: true,
        matchBrackets: true,
        lineWrapping: true, 
        theme: 'ryan-dark' 
    });

    marked.setOptions({
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        },
        breaks : true,
        langPrefix:'hljs '
    });

    //mathjax setting: no typesetting message
    //MathJax.Hub.config.messageStyle = 'none';
    if (typeof(_MathJax_DEV_Path)==='undefined'){
        MathJax.Ajax.config.root = "lib/mathjax/";
    }
    MathJax.Hub.Config({
        messageStyle : 'none',
        config: ["MMLorHTML.js"],
        jax: ["input/TeX","input/MathML", "input/AsciiMath", "output/HTML-CSS", "output/NativeMML"],
        extensions: [ "tex2jax.js",  "mml2jax.js", "asciimath2jax.js", "MathMenu.js", "MathZoom.js"],
        TeX: {
            extensions: [ "AMSmath.js",  "AMSsymbols.js", "noErrors.js", "noUndefined.js"]
        },
        imageFont: null
    });

    function update(e){
        var val = e.getValue();
        setOutput(val);
        clearTimeout(hashto);
        hashto = setTimeout(updateHash, 1000);
    }

    function setOutput(val){

        var es5 = $.support.leadingWhitespace;
        if (!es5){
            // set val to latex img
            val = val.replace(/\$\$((.*?\n)*?.*?)\$\$/ig, function(a, b){
                return '<img src="http://latex.codecogs.com/png.latex?' + encodeURIComponent(b) + '" />';
            });
        }
        val = marked(val);
        //extend marked by note tag
        val = val.replace(/\{\{tags:(.*)\}\}/ig,function(a,b){
            var ls = b.replace(/(^\s*)|(\s*$)/g,'').split(/[ /|]/).join('</code><code>'); 
            return '<p class="marked_tag"><i class="iconfont">&#xe602;</i><code>'+ls+'</code></p>';
        });

        document.getElementById('out').innerHTML = val;
        //use for refresh math 
        if (val.replace(/\$\$(.*)\$\$/i)&& es5){
            MathJax.Hub.Typeset(); 
        }
    }

    //editor global
    window.editor = editor;


    //content change
    editor.on("change", function(cm, change) { 
        update(cm);	
    });

    //scroll bar sync
    editor.on("scroll",function(cm){ 
        var obj = cm.getScrollInfo(); 
        var dom = document.getElementById('out');

        var sh = obj.height;
        var ch = obj.clientHeight;
        var ch2 = ch;
        var st = obj.top;
        var sh2 = dom.scrollHeight;

        dom.scrollTop = Math.floor(st * (sh2 - ch) / (sh - ch));
    });



    $(document).on('drop', function(e){
        e.preventDefault();
        e.stopPropagation();

        var theFile = e.dataTransfer.files[0];
        var theReader = new FileReader();
        theReader.onload = function(e){
            editor.setValue(e.target.result);
        };

        theReader.readAsText(theFile);
    }, false);

    function save(){
        var code = editor.getValue();
        var blob = new Blob([code], { type: 'text/plain' });
        saveBlob(blob);
    }

    function saveBlob(blob){
        var name = "untitled.md";
        if(window.saveAs){
            window.saveAs(blob, name);
        }else if(navigator.saveBlob){
            navigator.saveBlob(blob, name);
        }else{
            url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.setAttribute("href",url);
            link.setAttribute("download",name);
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            link.dispatchEvent(event);
        }
    }

    $(document).on('keydown', function(e){
        if(e.keyCode == 83 && (e.ctrlKey || e.metaKey)){
            e.preventDefault();
            save();
            return false;
        }
    });

    var hashto;

    function updateHash(){
        //window.location.hash = btoa(RawDeflate.deflate(unescape(encodeURIComponent(editor.getValue()))))
    }

    if(window.location.hash){
        var h = window.location.hash.replace(/^#/, '');
        if(h.slice(0,5) == 'view:'){
            setOutput(decodeURIComponent(escape(RawDeflate.inflate(atob(h.slice(5))))));
            document.body.className = 'view';
        }else{
            editor.setValue(decodeURIComponent(escape(RawDeflate.inflate(atob(h)))));
            update(editor);
            editor.focus();
        }
    }else{
        update(editor);
        editor.focus();
    }

    // siderbar show
    $('#save_btn').on('click',function(e){
        $('#mask').show();
        $('#sidebar').show();
    });

    $('#mask').on('click',function(e){
        if ($('#sidebar').attr('display')!=='none'){
            $('#sidebar').hide();
            $('#mask').hide();
        }
    });

    $('#sidebar').on('click',function(e){
        var type =  $(e.target).attr('_type');
        switch(type){ 
            case 'save_md':{
                save();
            };break;
            case 'save_pdf':{
                alert('保存PDF, 打印目标设为"另存为PDF"即可');
                //$('#sidebar').hide();
                //$('#mask').hide();
                document.body.innerHTML = $('#out').html();
                window.print();
                window.location.reload();
            };break;
            case 'save_imweb': {
                console.log('save_imweb')
                var content = editor.getValue();
                var form = $("<form/>").attr('action',"http://test.imweb.io/topic/create")
                .attr('method','post')
                .attr('target','_blank')
                .append('<input type="hidden" name="content" value="'+ content +'" />')
                .appendTo("body").css('display','none').submit();
            };break;

            default:;
        }

    });
};
