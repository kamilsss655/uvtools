const libuvk5 = {
    CMD_GET_FW_VER: new Uint8Array([0x14,0x05]), //#0x0514 -> 0x0515
    CMD_READ_FW_MEM: '\x17\x05', //#0x0517 -> 0x0518
    CMD_WRITE_FW_MEM: '\x19\x05', //#0x0519 -> 0x051a //Only in bootloader

    CMD_READ_CFG_MEM: '\x1B\x05', //#0x051B -> 0x051C
    CMD_WRITE_CFG_MEM: '\x1D\x05', //#0x051D -> 0x051E


    CMD_052D: '\x2D\x05',
    CMD_051F: '\x1F\x05',
    CMD_052F: '\x2F\x05',
    
    CMD_REBOOT: '\xDD\x05', //#0x05DD -> no reply
    CMD_0530: '\x30\x05', //#0x0530 -> no reply //Only in bootloader
    CMD_0527: '\x27\x05',
    CMD_0529: '\x29\x05',

    port: null,
    connect: async function (){
        log("Connecting...");
        this.port = await connect();
    },
    disconnect: async function (){
        try {
            if (this.port && this.port.readable) {
                // Close the port if it's open
                await this.port.close();
                console.log('Serial port disconnected.');
            } else {
                console.warn('Serial port is not open.');
            }
        } catch (error) {
            console.error('Error closing the serial port:', error);
        }
    },
    get_cfg_mem: async function (address, length) {
        console.log(this.CMD_GET_FW_VER);
        await sendPacket(this.port, this.CMD_GET_FW_VER);

        console.log("getReader");
        const reader = this.port.readable.getReader();

        while (true) {
            console.log("read");
            const { value, done } = await reader.read();
            if (done) {
                console.log("releaseLock");
                reader.releaseLock();
                break;
            }

        console.log("value");
        console.log(value);
        }

    },
  };