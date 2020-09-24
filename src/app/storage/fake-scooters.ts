import { Scooter } from '../models/scooter';
import { productType } from '../models/product';

export const scooters: Scooter[] = [];

const weights = [18, 11, 12.5, 15];
const maxDist = [25, 15, 30, 20];
const models = ['FRUGAL Stout', 'FRUGAL Comfy', 'XIAOMI MiJia 365', 'BLAUPUNKT ESC608'];

const prices = [1999, 999, 1699, 1599];

const photos = ['https://www.mediaexpert.pl/media/cache/gallery/product/3/93/704/200/jq8rkbin/images/21/2173357/Hulajnoga-elektryczna-FRUGAL-Stout-Czarny-skos.jpg',
'https://www.mediaexpert.pl/media/cache/gallery/product/1/471/562/294/iwcxgfic/images/21/2173361/Hulajnoga-elektryczna-FRUGAL-Comfy-AW-Czarno-czerwony-front.jpg',
'https://www.mediaexpert.pl/media/cache/gallery/product/3/635/518/845/bf8kqem1/images/12/1288719/1a.jpg',
'https://www.mediaexpert.pl/media/cache/gallery/product/1/78/458/637/ay6d2zeq/images/23/2360730/BLAUPUNKT-ESC608-Czarny-front.jpg'];

const specifications: [string, string][][] = [
    // Hulajnoga1
    [['Czas ładowania [h]', '4-5'],
    ['ROK', '2020'],
    ['Maksymalna prędkość [km/h]', '25'],
    ['Kolor', 'Czarny'],
    ['Maksymalne obciążenie [kg]', '100'],
    ['Moc silnika [W]', '300'],
    ['Rozmiar kół [cale]', '10'],
    ['HAMULCE', 'Tarczowe'],
    ['Funkcje dodatkowe', 'Kierunkowskazy, Oświetlenie LED, Szybki układ składania i rozkładania, Tempomat, Wyświetlacz LCD']],
    // Hulajnoga2
    [['Czas ładowania [h]', '3'],
    ['ROK', '2020'],
    ['Maksymalna prędkość [km/h]', '25'],
    ['Kolor', 'Czarno-czerwony'],
    ['Maksymalne obciążenie [kg]', '120'],
    ['Moc silnika [W]', '250'],
    ['Rozmiar kół [cale]', '8'],
    ['HAMULCE', 'Brak/Elektromagnetyczny, Nożny'],
    ['Funkcje dodatkowe', 'Amortyzator przód, Możliwość złożenia, Oświetlenie LED przód']],
    // Hulajnoga3
    [['Czas ładowania [h]', '5'],
    ['ROK', '2020'],
    ['Maksymalna prędkość [km/h]', '25'],
    ['Kolor', 'Biały'],
    ['Maksymalne obciążenie [kg]', '100'],
    ['Moc silnika [W]', '250'],
    ['Rozmiar kół [cale]', '8.5'],
    ['HAMULCE', 'Regeneracyjny/Tarczowy'],
    ['Maksymalna wysokość kierownicy [cm]', '114'],
    ['Materiał wykonania', 'Aluminium']],
    // Hulajnoga4
    [['Czas ładowania [h]', '5'],
    ['ROK', '2020'],
    ['Maksymalna prędkość [km/h]', '25'],
    ['Kolor', 'Biały'],
    ['Maksymalne obciążenie [kg]', '120'],
    ['Moc silnika [W]', '250'],
    ['Rozmiar kół [cale]', '8.5'],
    ['HAMULCE', 'Elektryczny/Tarczowy'],
    ['Maksymalna wysokość kierownicy [cm]', '115'],
    ['Materiał wykonania', 'Aluminium'],
    ['Funkcje dodatkowe', 'Sygnał dźwiękowy - dzwonek, Tempomat']]];

// tslint:disable-next-line: forin
for (const model in models) {
    scooters.push({ id: '', model: models[model],
        priceInPln: prices[model],
        additionalSpecification: specifications[model],
        photoUrl: photos[model],
        inStock: 1000,
        instanceOf: productType.Scooter,
        weightKg: weights[model],
        maxDistanceKm: maxDist[model]
     });
}
