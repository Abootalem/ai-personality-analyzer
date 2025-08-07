import React from 'react';
import type { BigFiveProfile } from '../types';
import { BigFiveTrait } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface BigFiveResultsChartProps {
  profile: BigFiveProfile;
}

const traitColors: Record<BigFiveTrait, string> = {
  [BigFiveTrait.Openness]: 'bg-blue-500',
  [BigFiveTrait.Conscientiousness]: 'bg-green-500',
  [BigFiveTrait.Extraversion]: 'bg-yellow-500',
  [BigFiveTrait.Agreeableness]: 'bg-pink-500',
  [BigFiveTrait.Neuroticism]: 'bg-red-500',
};

export const BigFiveResultsChart: React.FC<BigFiveResultsChartProps> = ({ profile }) => {
  const { t } = useTranslation();
  const traits = Object.keys(profile) as BigFiveTrait[];

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-6 text-center text-purple-300">{t('bigFive.title')}</h3>
      <div className="space-y-6">
        {traits.map((trait) => (
          <div key={trait}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-md font-medium text-gray-200">{t(`bigFive.${trait}.label`)}</span>
              <span className="text-sm font-semibold text-purple-300">{profile[trait].score.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-5 overflow-hidden">
              <div
                className={`${traitColors[trait]} h-5 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${profile[trait].score}%` }}
                title={`${profile[trait].score.toFixed(0)}%`}
                aria-label={`${t(`bigFive.${trait}.label`)} score: ${profile[trait].score.toFixed(0)}%`}
                role="progressbar"
                aria-valuenow={profile[trait].score}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1.5 italic">"{profile[trait].explanation}"</p>
            <p className="text-xs text-gray-500 mt-1">{t(`bigFive.${trait}.description`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};