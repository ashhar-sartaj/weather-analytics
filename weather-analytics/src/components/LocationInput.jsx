import { useState } from "react";

function LocationInput({onLocationSubmit}) {
    const countries = [
        { code:'', name: 'Option'},
        { code: 'IN', name: 'India' },
        { code: 'CN', name: 'China' },
        { code: 'US', name: 'United States' },
        { code: 'ID', name: 'Indonesia' },
        { code: 'PK', name: 'Pakistan' },
        { code: 'BR', name: 'Brazil' },
        { code: 'NG', name: 'Nigeria' },
        { code: 'BD', name: 'Bangladesh' },
        { code: 'RU', name: 'Russia' },
        { code: 'MX', name: 'Mexico' },
        { code: 'JP', name: 'Japan' },
        { code: 'ET', name: 'Ethiopia' },
        { code: 'PH', name: 'Philippines' },
        { code: 'EG', name: 'Egypt' },
        { code: 'VN', name: 'Vietnam' },
        { code: 'DR', name: 'Dominican Republic' },
        { code: 'TR', name: 'Turkey' },
        { code: 'IR', name: 'Iran' },
        { code: 'DE', name: 'Germany' },
        { code: 'TH', name: 'Thailand' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'FR', name: 'France' },
        { code: 'IT', name: 'Italy' },
        { code: 'PL', name: 'Poland' },
        { code: 'ES', name: 'Spain' },
        { code: 'AR', name: 'Argentina' },
        { code: 'CD', name: 'Congo (DRC)' },
        { code: 'CA', name: 'Canada' },
        { code: 'KR', name: 'South Korea' },
        { code: 'AU', name: 'Australia' },
        { code: 'KE', name: 'Kenya' },
        { code: 'MY', name: 'Malaysia' },
    ]
    const zipSuggestions = {
  IN: [
    '110001 Delhi',
    '400001 Mumbai', 
    '560001 Bangalore',
    '500001 Hyderabad',
    '600001 Chennai',
    '380001 Ahmedabad',
    '700001 Kolkata',
    '411001 Pune',
    '226001 Lucknow',
    '682001 Kochi',
    '208001 Kanpur',
    '160001 Chandigarh'
  ],
  US: [
    '10001 New York City',
    '90210 Beverly Hills',
    '60601 Chicago',
    '77001 Houston',
    '94101 San Francisco',
    '33101 Miami',
    '90001 Los Angeles',
    '19101 Philadelphia',
    '20001 Washington DC',
    '30301 Atlanta',
    '98101 Seattle',
    '94601 Oakland'
  ],
  GB: [
    'SW1A 1AA London',
    'EC1A 1BB London',
    'M1 1AA Manchester',
    'B1 1AA Birmingham',
    'EH1 1AA Edinburgh',
    'G1 1AA Glasgow',
    'LS1 1AA Leeds',
    'NG1 1AA Nottingham',
    'BS1 1AA Bristol',
    'SO14 1AA Southampton'
  ],
  CN: [
    '100000 Beijing',
    '200000 Shanghai',
    '510000 Guangzhou',
    '300000 Tianjin',
    '330000 Hangzhou',
    '610000 Chengdu',
    '450000 Zhengzhou',
    '250000 Jinan'
  ],
  ID: [
    '10210 Jakarta',
    '40110 Bandung',
    '50110 Semarang',
    '60110 Surabaya',
    '12110 Tangerang',
    '65110 Malang'
  ],
  PK: [
    '54000 Lahore',
    '74200 Karachi',
    '38000 Faisalabad',
    '46000 Rawalpindi',
    '38000 Multan'
  ],
  BR: [
    '01000-000 São Paulo',
    '20000-000 Rio de Janeiro',
    '30000-000 Belo Horizonte',
    '40000-000 Salvador',
    '50000-000 Fortaleza',
    '60000-000 Recife'
  ],
  NG: [
    '100001 Abuja',
    '101241 Lagos Island',
    '500001 Port Harcourt',
    '900001 Kano',
    '910001 Maiduguri'
  ],
  BD: [
    '1000 Dhaka',
    '4000 Chittagong',
    '2100 Khulna',
    '6000 Rajshahi',
    '3100 Sylhet'
  ],
  RU: [
    '101000 Moscow',
    '190000 Saint Petersburg',
    '620000 Yekaterinburg',
    '603000 Nizhny Novgorod',
    '350000 Krasnodar'
  ],
  MX: [
    '01000 Mexico City',
    '22000 Tijuana',
    '64000 Monterrey',
    '38100 Puebla',
    '97300 Mérida'
  ],
  JP: [
    '100-0001 Tokyo',
    '530-0001 Osaka',
    '060-0001 Sapporo',
    '450-0001 Nagoya',
    '700-0001 Hiroshima'
  ],
  ET: [
    '1000 Addis Ababa',
    '1250 Dire Dawa'
  ],
  PH: [
    '1000 Manila',
    '6000 Cebu City',
    '2800 Quezon City',
    '1600 Pasig'
  ],
  EG: [
    '11511 Cairo',
    '21523 Alexandria',
    '11757 Giza'
  ],
  VN: [
    '100000 Hanoi',
    '700000 Ho Chi Minh City',
    '500000 Da Nang'
  ],
  TR: [
    '34000 Istanbul',
    '35000 Izmir',
    '06000 Ankara',
    '38000 Bursa'
  ],
  IR: [
    '11366 Tehran',
    '91775 Isfahan',
    '81587 Mashhad'
  ],
  DE: [
    '10115 Berlin',
    '80331 Munich',
    '50667 Cologne',
    '20095 Hamburg',
    '30159 Hanover'
  ],
  TH: [
    '10200 Bangkok',
    '50200 Chiang Mai',
    '30000 Nakhon Ratchasima'
  ],
  FR: [
    '75001 Paris',
    '69001 Lyon',
    '33000 Bordeaux',
    '31000 Toulouse'
  ],
  IT: [
    '00100 Rome',
    '20100 Milan',
    '40100 Bologna',
    '80100 Naples'
  ],
  PL: [
    '00-001 Warsaw',
    '30-001 Krakow',
    '50-051 Wroclaw'
  ],
  ES: [
    '28001 Madrid',
    '08001 Barcelona',
    '29001 Malaga'
  ],
  AR: [
    '1000 Buenos Aires',
    '5000 Cordoba',
    '2000 Rosario'
  ],
  CD: [
    '00243 Kinshasa',
    '00250 Lubumbashi'
  ],
  CA: [
    'M5V Toronto',
    'V6B Vancouver',
    'T2P Calgary',
    'H3B Montreal'
  ],
  KR: [
    '03149 Seoul',
    '619 Busan'
  ],
  AU: [
    '2000 Sydney',
    '3000 Melbourne',
    '6000 Perth'
  ],
  KE: [
    '00100 Nairobi',
    '20100 Mombasa'
  ],
  MY: [
    '50000 Kuala Lumpur',
    '40470 Shah Alam'
  ]
};
    const [zip, setZip] = useState('');
    const [countryCode, setCountryCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (countryCode.trim().length==0) {
            console.log('select country code. ')
        } else {
            const locationKey = `${zip},${countryCode}`;
            onLocationSubmit(locationKey);
        }
    }
    const handleCountryChange = (e) => {
        setCountryCode(e.target.value);
    }
    const handleZipChange = (e) => {
        const a = e.target.value;
        const zip = a.split(' ')[0];
        // console.log(zip);
        setZip(zip);
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="country">Country</label>
                <select name="country" id="country" value={countryCode} onChange={handleCountryChange}>
                    {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="zip-code">Zip Code</label>
                <input value={zip} onChange={handleZipChange} list={`zips-${countryCode}`} placeholder="ZIP CODE"/>
                {zipSuggestions[countryCode] && (
                    <datalist id={`zips-${countryCode}`}>
                        {zipSuggestions[countryCode].map(item => (
                            <option key={item} value={item}></option>
                        ))}
                    </datalist>
                )}
            </div>
            <button type="submit">submit</button>
        </form>
        </>
    )
}
export default LocationInput;