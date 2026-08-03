# ReadJourney

ReadJourney, kullanıcıların kitap okuma yolculuklarını takip etmelerini sağlayan React + Vite tabanlı bir web uygulamasıdır. Uygulama sayesinde:

- önerilen kitapları görüntüleyebilir,
- kitapları kendi kütüphanesine ekleyebilir,
- okuma seansını başlatıp sonlandırabilir,
- ilerleme durumunu ve sayfa bilgilerini yönetebilir,
- giriş/üye olma akışı ile kişiselleştirilmiş deneyim yaşayabilirsiniz.

## Özellikler

- Kullanıcı kayıt ve giriş sistemi
- JWT tabanlı kimlik doğrulama
- Kitap öneri listesi ve filtreleme
- Kütüphane yönetimi
- Okuma süresi ve sayfa ilerlemesi takibi
- React Router ile sayfa yönlendirmeleri
- Redux Toolkit + Redux Persist ile durum yönetimi

## Teknoloji Yığını

- React 19
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- React Hot Toast
- CSS Modules

## Proje Yapısı

```text
src/
├── app/
├── components/
├── pages/
├── redux/
└── routes/
```

## Başlangıç

Projeyi yerelde çalıştırmak için aşağıdaki adımları izleyin:

1. Bağımlılıkları kurun:

```bash
npm install
```

2. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

3. Uygulama varsayılan olarak Vite geliştirme sunucusu üzerinden açılacaktır.

## Build

Production derlemesi oluşturmak için:

```bash
npm run build
```

## Önizleme

Build sonrası önizleme sunucusu başlatmak için:

```bash
npm run preview
```

## API

Uygulama, GoIT Read Journey API'sine bağlanır:

```text
https://readjourney.b.goit.study/api
```

## Notlar

- Kimlik doğrulama işlemleri Redux Toolkit async thunk'ları ile yönetilir.
- Kütüphane ve okuma verileri API üzerinden çekilir ve Redux store üzerinde tutulur.
- Uygulama özel rotalar üzerinden giriş yapmış kullanıcılar için erişim sağlar.

## Katkı

Projeye katkıda bulunmak isterseniz, önce bir branch oluşturup değişikliklerinizi commit ederek pull request gönderin.
