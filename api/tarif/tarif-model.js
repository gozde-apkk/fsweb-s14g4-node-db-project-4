const db= require("../../data/seeds/db-config");


async function adimIdYeGöreIcindekiler (adim_id){
    return db("İçindekiler_adim as ia")
           .leftJoin("içindekiler i","i.içindekiler")
           .leftJoin("adim as a","a.adim_id","ia.adim_id")
           .select("ia.içindekiler_id","i.içindekiler_adi","ia.miktar")
           .where("ia.adim_id",adim_id);
}

async function idyeGöreTarifGetir(tarif_id){
    const tarif = await db("tarif as t")
                  .leftJoin("adim as a","a.tarif_id","t.tarif_id")
                  .leftJoin("içindekiler_adim as ia","ia.adim_id","a.adim_id")
                  .leftJoin("içindekiler as i ","i.içindekiler_id","ia.içindekiler_id")
                  .select("t.*","a.adim_id","a.adim_sirasi","a.adim_talimati",
                  "i.içindekileid","i.içidekiler_adi","ia.miktar")
                  .where("t.tarif_id",tarif_id)

                   //middeleware'deki if'in çalışması için aşağıdakini yazmalıyız.
                  if(tarifler.length == 0){
                    return null;
                  };

                   

                  let responseTarifModel ={
                    tarif_id:tarifler[0].tarif_id,
                    tarif_adi:tarifler[0].tarif_adi,
                    kayit_tarihi:tarifler[0].kayit_tarihi,
                    adimlar:[]
                  };

                   //üstteki "adımlar" arrayinin içini doldurmak için aşağıdaki for let döngüsünü yaptık.
                    //çıkanları boş arraya push ettik
                    //tariflerin herbir elemanı tarif. sql'de her tarif_id 1 olan herbir sırada bir adım var.  [0]kullanmadık her staırda değişiyor
                     
                    for (let i = 0; i < tarifler.length; i++) {
                        const tarif = tarifler[i];
                        let adimModel = {
                          adim_id: tarif.adim_id,
                          adim_sirasi: tarif.adim_sirasi,
                          adim_talimati: tarif.adim_talimati,
                          icindekiler: [],
                        };

                        //aşağıda görüleceği üzere içindekiler için de for let yapabilirdik, ama ikinci yol denedik. amacımız performans yükünü sql'e yüklemek çünkü milyonlarca veri olsaydı, for let performansı düşürürdü.
                        //fonksiyonu yukarda tanımlamıştık ama push'lu çözüm burda çalışmadı, biz de eşitledik.
                      //verilen id için tarif olmayabilir. Ama tarif varsa içinde adım vardır. Ama her adımda içindekiler olmak zorunda değil (örneğin tencereyi ocağa koy gibi)
                         //array içinde aray oldu pushladığımız için. O yüzden direkt değişikene eşitledik
               


                         if (!!tarif.icindekiler_id) {
                            let fromDb = await adimIdYeGoreIcindekilerGetir(tarif.adim_id);
                            adimModel.icindekiler = fromDb;
                          }
                      
               /** 
                         tarif.forEach(tarif =>{
                    let adimModel ={
                        adim_id:tarif.adim_id,
                        adim_sirasi:tarif.adim_sirasi,
                        adim_talimati:tarif.adim_talimati,
                        içindekiler:[]
                    }
                    tarifler.forEach(item =>{
                        if(!!item.içindekiler.adim_id && tarif.adim_id == item.adim_id){
                           let içindekiler_model ={
                            içindekiler_id:item.içindekiler_id,
                            içindekiler_adi:item.içindekiler_adi,
                            miktar:item.miktar
                           }
                           adimModel.içindekiler.push(içindekiler_model)
                        }
                    })*/

                    responseTarifModel.adimlar.push(adimModel);
                } 
                return responseTarifModel;
};


module.exports={
    idyeGöreTarifGetir
}