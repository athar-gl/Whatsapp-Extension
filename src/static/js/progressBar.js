(function () {
  const initProgress = function () {
    if (!document.getElementById("__progressbar-root-div")) {
      var rootDiv = document.createElement("div");
      rootDiv.className = "progressbar-root-div";
      rootDiv.id = "__progressbar-root-div";
      var div1 = document.createElement("div");
      div1.className = "progressbar-container";
      div1.id = "__cont";
      var div2 = document.createElement("div");
      div2.className = "progressbar-border";
      var div3 = document.createElement("div");
      div3.className = "progressbar-green";
      div3.setAttribute("style", "width: 0%");
      div3.id = "__totalProgressBar";
      var div4 = document.createElement("p");
      div4.className = "progressbar-text";
      div4.id = "__totalProgressText";
      div4.textContent = "";
      var div5 = document.createElement("p");
      div5.className = "progressbar-text";
      div5.id = "__infoText";
      div5.textContent = "";
      div3.appendChild(div4);
      div2.appendChild(div3);
      div2.appendChild(div5);
      div1.appendChild(div2);
      rootDiv.appendChild(div1);
      var lbl = document.createElement("p");
      lbl.id = "__preparingText";
      lbl.setAttribute(
        "style",
        'z-index:10010;position:fixed;top:50%;left:50%;width:260px;transform: translateX(-50%) translateY(-50%);font-family:"Segoe UI",Helvetica Neue,Helvetica,Roboto,sans-serif !important;font-size: 1em;color:#000;line-height:1.3em;text-align:center;'
      );
      lbl.textContent = "Preparing to download...";
      rootDiv.appendChild(lbl);
      document.body.appendChild(rootDiv);
    }
  };

  let count = 1;
  const stopProgress = function () {
    if (document.getElementById("__progressbar-root-div")) {
      document
        .getElementById("__progressbar-root-div")
        .parentNode.removeChild(
          document.getElementById("__progressbar-root-div")
        );
      count = 1;
    }
  };

  const setProgressText = function (total, contactName) {
    if (document.getElementById("__infoText")) {
      document.getElementById(
        "__infoText"
      ).textContent = `${count} / ${total} chats, currently preparing: ${contactName}`;
      count = count + 1;
    }
  };

  window.progressBar = {
    initProgress,
    stopProgress,
    setProgressText,
  };
})();
