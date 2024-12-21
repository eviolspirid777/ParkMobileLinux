"use client";
import { useEffect, useState } from "react";

export const InputFileComponent = () => {
  const [, setSelectedImage] = useState<File>();
  const [imageBlob, setImageBlob] = useState<Blob>();
  const [itemsData, setItemsData] = useState<string>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const file = event.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result instanceof ArrayBuffer) {
          const arrayBuffer = e.target.result as ArrayBuffer;
          setImageBlob(
            new Blob([new Uint8Array(arrayBuffer)], { type: file.type })
          );
        } else {
          console.error("Ошибка чтения файла:", e.target!.error);
        }
      };

      reader.onerror = (error) => {
        console.error("Ошибка чтения файла:", error);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageBlob) {
      console.log("Изображение не выбрано");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageBlob, "image.jpg");
    formData.append("name", "MacBook Air 13 2024");

    await fetch("/api/ItemsPostgre/updatePhoto", {
      method: "POST",
      body: formData,
    });
  };

  const triggerData = () => {
    fetch("/api/ItemsPostgre/3/image")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => {
        const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        setItemsData(url as string);
      })
      .catch((error) => console.error("Ошибка:", error));
  };

  useEffect(() => {
    console.log(itemsData);
  }, [itemsData]);

  return (
    <form onSubmit={handleSubmit}>
      {itemsData && <img src={itemsData} alt="Product Image" />}
      <button type="button" onClick={triggerData}>
        HELLO
      </button>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Загрузить</button>
    </form>
  );
};
