window.onload = () => {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const id = params.get("id");

  if(id){
    document.getElementById(
      "assessment_id"
    ).value = id;
  }

};

async function saveControls(){

  const msg =
    document.getElementById("msg");

  const data = {

    assessment_id:
      document.getElementById("assessment_id").value,

    fullscreen:
      fullscreen.checked ? 1 : 0,

    tab_switch:
      tab_switch.checked ? 1 : 0,

    hover_detection:
      hover_detection.checked ? 1 : 0,

    copy_paste_block:
      copy_paste_block.checked ? 1 : 0,

    webcam:
      webcam.checked ? 1 : 0,

    mic:
      mic.checked ? 1 : 0,

    screen_record:
      screen_record.checked ? 1 : 0,

    show_result:
      show_result.checked ? 1 : 0,

    tab_limit:
      tab_limit.value || 3,

    hover_limit:
      hover_limit.value || 3,

    auto_submit_time: 1,
    auto_submit_tab: 1,
    auto_submit_hover: 1,
    auto_submit_fullscreen: 1
  };

  try{

    const res = await fetch(
      "/save-controls",
      {
        method:"POST",
        headers:{
          "Content-Type":
          "application/json"
        },
        body:JSON.stringify(data)
      }
    );

    const result =
      await res.json();

    if(result.success){

      msg.style.color =
        "#22c55e";

      msg.innerText =
        "Controls Saved";

    }else{

      msg.style.color =
        "#ef4444";

      msg.innerText =
        "Failed";

    }

  }catch(err){

    msg.style.color =
      "#ef4444";

    msg.innerText =
      "Server Error";

  }

}