const batCalButton = document.getElementById('batCalButton');
batCalButton.addEventListener('click', async function () {
    await libuvk5.connect();
    try {
        await libuvk5.get_cfg_mem();
    } catch(error){
        console.log(error);
    }
    finally{
        libuvk5.disconnect();
    }
})