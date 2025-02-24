<script setup lang="ts">
//3038057537
//3760047847
import { onMounted } from "vue";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { Api } from "telegram";
const localSession = localStorage.getItem("session");
const sessionData = localSession ? JSON.parse(localSession) : null;
debugger;
const onSessionUpdate = (session: any) => {
  debugger;
};
const session = new StringSession(sessionData);
const client = new TelegramClient(
  session,
  7718446,
  "ba885b2995255bed060304a1d2b4ea55",
  {
    connectionRetries: 5,
  }
);

onMounted(async () => {
  if (localSession) {
    await client.connect();
    client.sendMessage("6690359086", {
      message: "111",
    });
    client.addEventHandler(async (update) => {
      console.log(update);
      if (
        update instanceof Api.UpdateNewMessage ||
        update instanceof Api.UpdateNewChannelMessage
      ) {
        const message = update.message;
        if (
          message instanceof Api.Message ||
          message instanceof Api.MessageService
        ) {
          if (
            message.media &&
            message.media instanceof Api.MessageMediaPhoto &&
            message.media.photo instanceof Api.Photo
          ) {
            const d = await client.downloadFile(
              new Api.InputPhotoFileLocation({
                id: message.media.photo.id,
                fileReference: message.media.photo.fileReference,
                accessHash: message.media.photo.accessHash,
                thumbSize: message.media.photo.sizes.find(
                  (el) => el.type === "x"
                )?.type,
              }),
              {
                dcId: message.media.photo.dcId,
              }
            );
            if (d instanceof Buffer) {
              const prefix = `data:image/jpeg;base64,`;

              const base64 = `${prefix}${btoa(String.fromCharCode(...d))}`;
              console.log(base64);
              const img = document.createElement("img");
              img.src = base64;
              debugger;
              document.body.appendChild(img);
            }

            // const res = await client.invoke(
            //   new Api.upload.GetFile({
            //     location: new Api.InputPhotoFileLocation({
            //       id: message.media.photo.id,
            //       fileReference: message.media.photo.fileReference,
            //       accessHash: message.media.photo.accessHash,
            //       thumbSize: message.media.photo.sizes[0].type,
            //     }),
            //     precise: true,
            //     cdnSupported: true,
            //     offset: BigInt(0),
            //     limit: message.media.photo.sizes[0].size,
            //   })
            // );
            console.log(d);
          }
        }
      }
    });
  } else {
    client
      .start({
        botAuthToken: "6986001339:AAE16AwU-14-x3zTfflayVWkBABiMhzfelY",
        onError: (error) => {
          console.log(error);
        },
      })
      .then(async () => {
        debugger;
        console.log("111");
        localStorage.setItem("session", JSON.stringify(client.session.save()));
        await client.sendMessage("me", {
          message: "You're successfully logged in!",
        });
      });
  }
});
</script>

<template>
  <div>111</div>
</template>
