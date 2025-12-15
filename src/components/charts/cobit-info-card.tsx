import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CobitInfoProps {
  className?: string;
}

export function CobitInfoCard({ className }: CobitInfoProps) {
  return (
    <Card className={`${className} border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20`}>
      <CardHeader>
        <CardTitle className="text-blue-700 dark:text-blue-300">Tentang COBIT 5 Framework</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Domain MEA (Monitor, Evaluate, and Assess)</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-blue-700 dark:text-blue-300">
              <li>MEA01 – Performance and Conformance</li>
              <li>MEA02 – System of Internal Control</li>
              <li>MEA03 – Compliance with External Requirements</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Skala Penilaian</h4>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4, 5].map((level) => (
                <Badge key={level} variant="outline" className="text-xs border-blue-300 text-blue-700 dark:text-blue-300">
                  {level} - {['Incomplete', 'Performed', 'Managed', 'Established', 'Predictable', 'Optimizing'][level]}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-1 text-blue-800 dark:text-blue-200">Tujuan Domain MEA</h4>
            <p className="text-sm text-muted-foreground">
              Memastikan kinerja dan kepatuhan TI terhadap persyaratan internal dan eksternal melalui
              pemantauan, evaluasi, dan penilaian yang efektif.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}