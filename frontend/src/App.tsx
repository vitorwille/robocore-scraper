import { useEffect, useState } from 'react';
import { Trophy, Medal, Award, Crown, Moon, Sun } from 'lucide-react';


interface TeamData {
  id: number;
  name: string;
  top1: number;
  top2: number;
  top3: number;
  total: number;
  rank: number;
}

function App() {
  const [data, setData] = useState<TeamData[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrapedCount, setScrapedCount] = useState(0);



  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const eventSource = new EventSource(`${apiUrl}/api/scrape`);


    eventSource.onmessage = (event) => {
      setScrapedCount((prev) => prev + 1);
    };


    eventSource.addEventListener('done', (event: MessageEvent) => {
      try {
        const finalData = JSON.parse(event.data);
        setData(finalData);
        setIsLoading(false);
        eventSource.close();
      } catch (error) {
        console.error('Error parsing final data:', error);
        setIsLoading(false);
      }
    });

    eventSource.onerror = (err) => {
      console.error('EventSource failed:', err);
      setIsLoading(false);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans p-4 md:p-6`}>
      <div className="max-w-6xl mx-auto space-y-6 md:y-8">
        <div className={`flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl shadow-sm border transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
          } gap-6`}>
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>RoboCore - Ranking</h1>
              <a href="https://github.com/vitorwille/" target="_blank" className={`text-sm md:text-base font-medium mt-1 underline transition-colors ${isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'
                }`}>github.com/vitorwille</a>
              <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Este dashboard faz o scraping apenas das 100 equipes presentes na homepage do painel de eventos da RoboCore.<br />Algumas equipes podem não estar presentes na lista abaixo.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center shrink-0 ${isDarkMode
                ? 'bg-slate-700 border-slate-600 text-yellow-400 hover:bg-slate-600'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
                }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5 grayscale" /> : <Moon className="w-5 h-5 grayscale" />}
            </button>
            <div className={`text-center px-4 py-2 rounded-lg border transition-colors ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-100'
              }`}>
              <p className={`text-xs uppercase font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Equipes exibidas</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-slate-800'}`}>{data?.length} EQUIPES</p>

            </div>
          </div>
        </div>

        <div className={`rounded-2xl shadow-sm border transition-colors duration-300 overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] md:min-w-0">
              <thead>
                <tr className={`border-b transition-colors ${isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                  } text-xs md:text-sm uppercase tracking-wider font-semibold`}>
                  <th className="px-4 md:px-6 py-4">Posição</th>
                  <th className="px-4 md:px-6 py-4">Equipe</th>
                  <th className="px-4 md:px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Crown className="w-4 h-4 text-amber-500" />
                      1º Lugar
                    </div>
                  </th>
                  <th className="px-4 md:px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Medal className="w-4 h-4 text-slate-400" />
                      2º Lugar
                    </div>
                  </th>
                  <th className="px-4 md:px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="w-4 h-4 text-amber-700" />
                      3º Lugar
                    </div>
                  </th>
                  <th className="px-4 md:px-6 py-4 text-right">Troféus totais</th>
                </tr>
              </thead>
              <tbody className={`divide-y transition-colors ${isDarkMode ? 'divide-slate-700' : 'divide-slate-100'}`}>
                {data.map((team, index) => (
                  <tr key={team.id} className={`transition-colors duration-200 group ${isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-blue-50/50'
                    }`}>
                    <td className="px-4 md:px-6 py-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm md:text-base ${team.rank === 1 ? isDarkMode ? 'border-1 border-white/40 bg-amber-400/30 text-amber-200' : 'border-1 border-black/60 bg-amber-400/60 text-amber-700' :
                        team.rank === 2 ? isDarkMode ? 'border-1 border-white/40' : 'border-1 border-black/60 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' :
                          team.rank === 3 ? isDarkMode ? 'border-1 border-white/40 bg-amber-900/30 text-orange-100' : 'border-1 border-black/60 bg-amber-900 text-orange-100' :
                            isDarkMode ? 'bg-slate-900 text-slate-500' : 'bg-slate-200 text-slate-600'
                        }`}>
                        {team.rank > 0 ? team.rank : index + 1}
                      </div>
                    </td>
                    <td className={`px-4 md:px-6 py-4 font-semibold text-sm md:text-base ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                      {team.name}
                    </td>
                    <td className={`px-4 md:px-6 py-4 text-center font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      {team.top1}
                    </td>
                    <td className={`px-4 md:px-6 py-4 text-center font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      {team.top2}
                    </td>
                    <td className={`px-4 md:px-6 py-4 text-center font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      {team.top3}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-bold text-xs md:text-sm ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                        }`}>
                        {team.total}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isLoading && (
            <div className={`p-12 text-center flex flex-col items-center w-full ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <span>Executando scraper - aguarde...</span>
              <span className="mb-8 text-xs opacity-80">Isto pode levar um certo tempo. Equipes contabilizadas: {scrapedCount}/100</span>

              {data.length === 0 && (
                <div className="w-full space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-12 w-full rounded-lg animate-pulse ${isDarkMode ? 'bg-slate-600/50' : 'bg-slate-200'}`}></div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
